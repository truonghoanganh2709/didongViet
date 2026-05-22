import mongoose from 'mongoose';

const specsSchema = new mongoose.Schema(
  {
    screen: String,
    chip: String,
    ram: String,
    storage: String,
    battery: String,
    camera: String,
    os: String,
    sim: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    brand: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [{ type: String }],
    thumbnail: { type: String, default: '' },
    description: { type: String, default: '' },
    specs: specsSchema,
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.virtual('displayPrice').get(function displayPrice() {
  return this.salePrice && this.salePrice < this.price ? this.salePrice : this.price;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
