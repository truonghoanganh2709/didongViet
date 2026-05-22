import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Category from '../models/Category.js';
import { slugify } from '../utils/slugify.js';

export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });
  res.json({ success: true, data: categories });
});

export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug, isActive: true });
  if (!category) throw new ApiError(404, 'Category not found');
  res.json({ success: true, data: category });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, image, parent } = req.body;
  const slug = slugify(name);

  const exists = await Category.findOne({ slug });
  if (exists) throw new ApiError(400, 'Category slug already exists');

  const category = await Category.create({ name, slug, image, parent });
  res.status(201).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');

  const { name, image, parent, isActive } = req.body;
  if (name) {
    category.name = name;
    category.slug = slugify(name);
  }
  if (image !== undefined) category.image = image;
  if (parent !== undefined) category.parent = parent;
  if (isActive !== undefined) category.isActive = isActive;

  const updated = await category.save();
  res.json({ success: true, data: updated });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');
  await category.deleteOne();
  res.json({ success: true, message: 'Category removed' });
});
