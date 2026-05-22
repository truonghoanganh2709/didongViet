import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Product from '../models/Product.js';
import { slugify } from '../utils/slugify.js';

const getEffectivePrice = (product) =>
  product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;

const buildSort = (sort) => {
  switch (sort) {
    case 'price_asc':
      return { price: 1 };
    case 'price_desc':
      return { price: -1 };
    case 'name':
      return { name: 1 };
    case 'rating':
      return { 'rating.average': -1 };
    default:
      return { createdAt: -1 };
  }
};

export const getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 12);
  const skip = (page - 1) * limit;

  const filter = { isActive: true };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.brand) filter.brand = new RegExp(`^${req.query.brand}$`, 'i');
  if (req.query.featured === 'true') filter.isFeatured = true;

  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  if (req.query.q) {
    filter.$or = [
      { name: new RegExp(req.query.q, 'i') },
      { brand: new RegExp(req.query.q, 'i') },
      { description: new RegExp(req.query.q, 'i') },
    ];
  }

  const sort = buildSort(req.query.sort);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

export const getBrands = asyncHandler(async (_req, res) => {
  const brands = await Product.distinct('brand', { isActive: true });
  res.json({ success: true, data: brands.sort() });
});

export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true });
  if (!product) throw new ApiError(404, 'Product not found');

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    isActive: true,
  })
    .limit(4)
    .select('name slug brand thumbnail price salePrice rating');

  res.json({ success: true, data: related });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate(
    'category',
    'name slug'
  );
  if (!product) throw new ApiError(404, 'Product not found');
  res.json({ success: true, data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const data = { ...req.body, slug: slugify(req.body.name) };

  const exists = await Product.findOne({ slug: data.slug });
  if (exists) throw new ApiError(400, 'Product slug already exists');

  const product = await Product.create(data);
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  Object.assign(product, req.body);
  if (req.body.name) product.slug = slugify(req.body.name);

  const updated = await product.save();
  res.json({ success: true, data: updated });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');
  await product.deleteOne();
  res.json({ success: true, message: 'Product removed' });
});

export { getEffectivePrice };
