import mongoose from 'mongoose';
import { env } from './env.js';

const connectDB = async () => {
  const isAtlas = env.mongoUri.startsWith('mongodb+srv://');

  try {
    const conn = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: isAtlas ? 15000 : 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('\n--- MongoDB connection failed ---');
    console.error(error.message);

    if (isAtlas) {
      console.error('\nAtlas checklist:');
      console.error('- MONGODB_URI trong server/.env đúng user/password');
      console.error('- Đã thêm IP trong Atlas → Network Access');
      console.error('- URI có /didongviet trước dấu ?');
      console.error('- Xem hướng dẫn: docs/MONGODB-ATLAS.md\n');
    } else {
      console.error('\nLocal MongoDB: chạy docker compose up -d hoặc net start MongoDB\n');
    }

    process.exit(1);
  }
};

export default connectDB;
