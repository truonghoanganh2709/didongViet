import { Router } from 'express';
import {
  getProducts,
  getBrands,
  getRelatedProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProducts);
router.get('/meta/brands', getBrands);
router.get('/:slug/related', getRelatedProducts);
router.get('/:slug', getProductBySlug);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
