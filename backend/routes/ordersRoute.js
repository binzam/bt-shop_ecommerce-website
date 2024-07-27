import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  cancelUserOrder,
} from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place_order', requireAuth, createOrder);
router.get('/user/:id', requireAuth, getOrdersByUser);
router.post('/cancel_order/:id', requireAuth, cancelUserOrder);

export default router;
