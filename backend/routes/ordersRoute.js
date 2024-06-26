import express from 'express';
import { getCredFromAuthToken } from '../middleware/authMiddleware.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();


// place order
router.post('/', getCredFromAuthToken, createOrder);


export default router;