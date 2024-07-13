import express from 'express';
import {
  createOrder,
  getOrders,
  getOrdersById,
  removeOrder,
} from '../controllers/orderController.js';
import { requireAuth, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// place order
router.post('/place_order', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrdersById);
router.delete('/remove_order/:id', requireAuth, verifyAdmin, removeOrder);

export default router;
