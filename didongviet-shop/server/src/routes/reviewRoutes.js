import { Router } from 'express';
import { getProductReviews, createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/product/:slug', getProductReviews);
router.post('/product/:slug', protect, createReview);

export default router;
