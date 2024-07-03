import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();


// place order
router.post('/', createOrder);


export default router;