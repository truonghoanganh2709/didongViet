import dotenv from 'dotenv';
import { connectDB } from '../lib/db.js';
import Product from '../model/product.model.js';
import { products } from '../../frontend/src/data/products.js';

dotenv.config();

const seedProducts = async () => {
  await connectDB();

  const operations = products.map((product) => ({
    updateOne: {
      filter: { slug: product.id },
      update: {
        $set: {
          slug: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          oldPrice: product.oldPrice,
          discount: product.discount,
          image: product.image,
          rating: product.rating,
          description: product.description,
          specs: product.specs,
          promotion: product.promotion,
          isActive: true,
        },
        $setOnInsert: {
          stock: 50,
        },
      },
      upsert: true,
    },
  }));

  await Product.bulkWrite(operations);
  console.log(`Seeded ${operations.length} products`);
  process.exit(0);
};

seedProducts().catch((error) => {
  console.error('Failed to seed products:', error);
  process.exit(1);
});
