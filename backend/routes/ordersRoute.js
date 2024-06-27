import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();


// place order
router.post('/', requireAuth, createOrder);


export default router;