import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { validateAndCalcDiscount } from '../utils/couponHelper.js';

const generateOrderCode = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DDV${y}${m}${d}${rand}`;
};

export const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod = 'cod',
    note = '',
    shippingFee = 30000,
    couponCode = '',
  } = req.body;

  if (!shippingAddress?.name || !shippingAddress?.phone) {
    throw new ApiError(400, 'Shipping name and phone are required');
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart?.items?.length) throw new ApiError(400, 'Cart is empty');

  const orderItems = [];
  let subtotal = 0;

  for (const item of cart.items) {
    const product = item.product;
    if (!product?.isActive) throw new ApiError(400, `Product unavailable: ${product?.name}`);

    if (product.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${product.name}`);
    }

    const lineTotal = item.price * item.quantity;
    subtotal += lineTotal;

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.thumbnail || product.images?.[0] || '',
      quantity: item.quantity,
      price: item.price,
    });

    product.stock -= item.quantity;
    await product.save();
  }

  const { discount, coupon } = await validateAndCalcDiscount(couponCode, subtotal);
  const total = Math.max(0, subtotal + shippingFee - discount);

  if (coupon) {
    coupon.usedCount += 1;
    await coupon.save();
  }

  const order = await Order.create({
    user: req.user._id,
    orderCode: generateOrderCode(),
    items: orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingFee,
    discount,
    total,
    note,
    couponCode: coupon?.code || '',
  });

  cart.items = [];
  await cart.save();

  res.status(201).json({ success: true, data: order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 20);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.status) filter.status = req.query.status;

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Order.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: orders,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'name slug');
  if (!order) throw new ApiError(404, 'Order not found');

  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized');
  }

  res.json({ success: true, data: order });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');

  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
  if (status && !allowed.includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  if (status) order.status = status;

  const updated = await order.save();
  res.json({ success: true, data: updated });
});
