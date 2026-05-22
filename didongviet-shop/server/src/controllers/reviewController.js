import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Review from '../models/Review.js';
import Product from '../models/Product.js';

export const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true });
  if (!product) throw new ApiError(404, 'Product not found');

  const reviews = await Review.find({ product: product._id })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) throw new ApiError(400, 'Rating and comment are required');

  const product = await Product.findOne({ slug, isActive: true });
  if (!product) throw new ApiError(404, 'Product not found');

  const exists = await Review.findOne({ user: req.user._id, product: product._id });
  if (exists) throw new ApiError(400, 'You already reviewed this product');

  const review = await Review.create({
    user: req.user._id,
    product: product._id,
    rating: Number(rating),
    comment,
  });

  const allReviews = await Review.find({ product: product._id });
  const count = allReviews.length;
  const average =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / count;

  product.rating = { average: Math.round(average * 10) / 10, count };
  await product.save();

  const populated = await Review.findById(review._id).populate('user', 'name avatar');

  res.status(201).json({ success: true, data: populated });
});
