import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Wishlist from '../models/Wishlist.js';

const populateWishlist = (query) =>
  query.populate({
    path: 'products',
    select: 'name slug brand thumbnail price salePrice stock rating',
  });

export const getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await populateWishlist(Wishlist.findOne({ user: req.user._id }));

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    wishlist = await populateWishlist(Wishlist.findById(wishlist._id));
  }

  res.json({ success: true, data: wishlist });
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) throw new ApiError(400, 'productId is required');

  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

  const index = wishlist.products.findIndex((id) => id.toString() === productId);
  let added = false;

  if (index >= 0) {
    wishlist.products.splice(index, 1);
  } else {
    wishlist.products.push(productId);
    added = true;
  }

  await wishlist.save();
  const updated = await populateWishlist(Wishlist.findById(wishlist._id));

  res.json({ success: true, data: updated, added });
});
