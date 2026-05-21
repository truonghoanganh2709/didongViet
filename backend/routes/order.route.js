import express from 'express';
import { createOrder, getMyOrders, lookupOrder } from '../controllers/order.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createOrder);
router.get('/lookup', lookupOrder);
router.get('/my-orders', protectRoute, getMyOrders);

export default router;
