import Order from '../model/order.model.js';
import Product from '../model/product.model.js';
import User from '../model/user.model.js';

const createOrderCode = () => {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MZ${stamp}${random}`;
};

const buildOrderItems = async (items) => {
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: Math.max(1, Number(item.quantity || 1)),
    });
  }

  return orderItems;
};

export const createOrder = async (req, res) => {
  try {
    const { customerName, phone, email = '', address, note = '', paymentMethod = 'cod', items } = req.body;

    if (!customerName || !phone || !address || !items?.length) {
      return res.status(400).json({ message: 'Missing required order information' });
    }

    const orderItems = await buildOrderItems(items);
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    const discount = 0;
    const total = subtotal + shippingFee - discount;

    const order = await Order.create({
      code: createOrderCode(),
      user: req.user?._id || null,
      customerName,
      phone,
      email,
      address,
      note,
      items: orderItems,
      subtotal,
      shippingFee,
      discount,
      total,
      paymentMethod,
      status: 'pending',
    });

    if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, { cartItems: [] });
    }

    res.status(201).json({ order, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

export const lookupOrder = async (req, res) => {
  try {
    const { code, phone } = req.query;

    if (!code || !phone) {
      return res.status(400).json({ message: 'Order code and phone are required' });
    }

    const order = await Order.findOne({ code: code.toUpperCase(), phone }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to lookup order',
      error: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};
