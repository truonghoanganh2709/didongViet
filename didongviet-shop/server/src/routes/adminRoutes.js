import { Router } from 'express';
import { getDashboardStats, getAdminUsers } from '../controllers/adminController.js';
import { getAllOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.get('/users', getAdminUsers);

export default router;
