import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  submitRating,
} from '../controllers/productController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/rate_product', requireAuth, submitRating);

export default router;
