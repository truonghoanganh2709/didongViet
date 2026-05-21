import Product from '../model/product.model.js';
import User from '../model/user.model.js';

const getPopulatedCart = async (userId) => {
  const user = await User.findById(userId).populate('cartItems.product');
  return user.cartItems.filter((item) => item.product);
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await getPopulatedCart(req.user._id);
    res.json({ cartItems });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch cart',
      error: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    const existingItem = user.cartItems.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      user.cartItems.push({ product: productId, quantity: Number(quantity) });
    }

    await user.save();
    const cartItems = await getPopulatedCart(req.user._id);

    res.json({ cartItems, message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add product to cart',
      error: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cartItems.find((cartItem) => cartItem.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.quantity = Math.max(1, Number(quantity));
    await user.save();
    const cartItems = await getPopulatedCart(req.user._id);

    res.json({ cartItems, message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update cart',
      error: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.cartItems = user.cartItems.filter((item) => item.product.toString() !== productId);
    await user.save();
    const cartItems = await getPopulatedCart(req.user._id);

    res.json({ cartItems, message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to remove cart item',
      error: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { cartItems: [] });
    res.json({ cartItems: [], message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to clear cart',
      error: error.message,
    });
  }
};
