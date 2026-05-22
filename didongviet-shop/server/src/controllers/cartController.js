import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { getEffectivePrice } from './productController.js';

const populateCart = (query) =>
  query.populate({
    path: 'items.product',
    select: 'name slug thumbnail price salePrice stock brand',
  });

export const getCart = asyncHandler(async (req, res) => {
  let cart = await populateCart(Cart.findOne({ user: req.user._id }));

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
    cart = await populateCart(Cart.findById(cart._id));
  }

  res.json({ success: true, data: cart });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product || !product.isActive) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, 'Insufficient stock');

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const price = getEffectivePrice(product);
  const existing = cart.items.find((i) => i.product.toString() === productId);

  if (existing) {
    existing.quantity += quantity;
    existing.price = price;
  } else {
    cart.items.push({ product: productId, quantity, price });
  }

  await cart.save();
  cart = await populateCart(Cart.findById(cart._id));

  res.json({ success: true, data: cart });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (!quantity || quantity < 1) throw new ApiError(400, 'Quantity must be at least 1');

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) throw new ApiError(404, 'Cart not found');

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) throw new ApiError(404, 'Item not in cart');

  const product = await Product.findById(productId);
  if (!product || product.stock < quantity) throw new ApiError(400, 'Insufficient stock');

  item.quantity = quantity;
  item.price = getEffectivePrice(product);
  await cart.save();

  const updated = await populateCart(Cart.findById(cart._id));
  res.json({ success: true, data: updated });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) throw new ApiError(404, 'Cart not found');

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();

  const updated = await populateCart(Cart.findById(cart._id));
  res.json({ success: true, data: updated });
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) throw new ApiError(404, 'Cart not found');

  cart.items = [];
  await cart.save();
  res.json({ success: true, data: cart });
});
