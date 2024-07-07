import express from 'express';
import {
  createOrder,
  getOrders,
  getOrdersById,
  removeOrder,
} from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// place order
router.post('/place_order', requireAuth, createOrder);
router.get('/', getOrders);
router.get('/:id', getOrdersById);
router.delete('/remove_order/:id', removeOrder);

export default router;
