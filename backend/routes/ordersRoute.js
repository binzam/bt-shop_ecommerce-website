import express from 'express';
import {
  getOrdersByUser,
  cancelUserOrder,
} from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/user', requireAuth, getOrdersByUser);
router.post('/cancel_order/:id', requireAuth, cancelUserOrder);
export default router;
