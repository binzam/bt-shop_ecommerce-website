import express from 'express';
import {
  createOrder,
  getOrders,
  getOrdersById,
} from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// place order
router.post('/place_order', requireAuth, createOrder);
router.get('/', getOrders);
router.get('/:id', getOrdersById);

export default router;
