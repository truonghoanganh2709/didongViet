import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Wishlist from '../models/Wishlist.js';
import Review from '../models/Review.js';
import Coupon from '../models/Coupon.js';
import { slugify } from '../utils/slugify.js';

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    Cart.deleteMany(),
    Wishlist.deleteMany(),
    Review.deleteMany(),
    Coupon.deleteMany(),
  ]);

  const admin = await User.create({
    name: 'Admin DDV',
    email: 'admin@didongviet.vn',
    password: 'admin123',
    phone: '0900000000',
    role: 'admin',
  });

  const user = await User.create({
    name: 'Nguyễn Văn A',
    email: 'user@test.com',
    password: '123456',
    phone: '0912345678',
  });

  await Cart.create({ user: user._id, items: [] });
  await Wishlist.create({ user: user._id, products: [] });

  const categories = await Category.insertMany([
    { name: 'iPhone', slug: 'iphone', image: '' },
    { name: 'Samsung', slug: 'samsung', image: '' },
    { name: 'Xiaomi', slug: 'xiaomi', image: '' },
  ]);

  const products = [
    {
      name: 'iPhone 16 Pro Max 256GB',
      brand: 'Apple',
      category: categories[0]._id,
      price: 34990000,
      salePrice: 33990000,
      stock: 20,
      isFeatured: true,
      description: 'iPhone 16 Pro Max chính hãng VN/A, bảo hành 12 tháng.',
      specs: {
        screen: '6.9 inch Super Retina XDR',
        chip: 'A18 Pro',
        ram: '8GB',
        storage: '256GB',
        battery: '4685 mAh',
        camera: '48MP + 48MP + 12MP',
        os: 'iOS 18',
        sim: '2 Nano + eSIM',
      },
    },
    {
      name: 'Samsung Galaxy S25 Ultra 512GB',
      brand: 'Samsung',
      category: categories[1]._id,
      price: 32990000,
      salePrice: 31990000,
      stock: 15,
      isFeatured: true,
      description: 'Galaxy AI, S Pen tích hợp, camera 200MP.',
      specs: {
        screen: '6.9 inch Dynamic AMOLED 2X',
        chip: 'Snapdragon 8 Elite',
        ram: '12GB',
        storage: '512GB',
        battery: '5000 mAh',
        camera: '200MP + 50MP + 50MP + 10MP',
        os: 'Android 15',
        sim: '2 Nano',
      },
    },
    {
      name: 'Xiaomi 15 Ultra 16GB/512GB',
      brand: 'Xiaomi',
      category: categories[2]._id,
      price: 28990000,
      stock: 25,
      isFeatured: true,
      description: 'Camera Leica, sạc nhanh 90W.',
      specs: {
        screen: '6.73 inch LTPO AMOLED',
        chip: 'Snapdragon 8 Elite',
        ram: '16GB',
        storage: '512GB',
        battery: '5410 mAh',
        camera: '50MP Leica quad',
        os: 'HyperOS 2',
        sim: '2 Nano',
      },
    },
  ];

  for (const p of products) {
    await Product.create({
      ...p,
      slug: slugify(p.name),
      thumbnail: '',
      images: [],
    });
  }

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  await Coupon.insertMany([
    {
      code: 'DDV10',
      type: 'percent',
      value: 10,
      minOrder: 5000000,
      maxDiscount: 500000,
      usageLimit: 1000,
      expiresAt: nextYear,
    },
    {
      code: 'GIAM500K',
      type: 'fixed',
      value: 500000,
      minOrder: 10000000,
      usageLimit: 500,
      expiresAt: nextYear,
    },
    {
      code: 'WELCOME',
      type: 'percent',
      value: 5,
      minOrder: 0,
      maxDiscount: 300000,
      usageLimit: 9999,
      expiresAt: nextYear,
    },
  ]);

  console.log('Seed completed!');
  console.log('Admin: admin@didongviet.vn / admin123');
  console.log('User:  user@test.com / 123456');
  console.log('Coupons: DDV10, GIAM500K, WELCOME');
  console.log(`Admin ID: ${admin._id}`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
