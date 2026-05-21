import mongoose from 'mongoose';
import Product from '../model/product.model.js';

const buildProductQuery = (query) => {
  const filter = { isActive: true };

  if (query.category) filter.category = query.category;
  if (query.brand) filter.brand = query.brand;
  if (query.search) {
    filter.name = { $regex: query.search, $options: 'i' };
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  return filter;
};

const buildProductSort = (sort) => {
  if (sort === 'price-asc') return { price: 1 };
  if (sort === 'price-desc') return { price: -1 };
  if (sort === 'discount') return { discount: -1 };
  return { rating: -1, createdAt: -1 };
};

export const getProducts = async (req, res) => {
  try {
    const filter = buildProductQuery(req.query);
    const sort = buildProductSort(req.query.sort);
    const products = await Product.find(filter).sort(sort);

    res.json({ products });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { slug: id }] }
      : { slug: id };

    const product = await Product.findOne({ ...filter, isActive: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};
