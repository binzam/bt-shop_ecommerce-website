import express from 'express';
import {
  createOrder,
  getOrders,
  removeOrder,
} from '../controllers/orderController.js';
import { requireAuth, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// place order
router.post('/place_order', createOrder);
// router.get('/', requireAuth, verifyAdmin, getOrders);
router.get('/',  getOrders);
router.delete('/remove_order/:id', requireAuth, verifyAdmin, removeOrder);

export default router;
