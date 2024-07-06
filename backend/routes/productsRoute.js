import express from 'express';
const router = express.Router();
import {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  submitRating,
} from '../controllers/productController.js';
import { requireAuth, verifyAdmin } from '../middleware/authMiddleware.js';

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/add_product', requireAuth, verifyAdmin, addNewProduct);
router.post('/rate_product', requireAuth, submitRating);
router.put('/update_product/:id', requireAuth, verifyAdmin, updateProduct);
router.delete('/remove_product/:id', requireAuth, verifyAdmin, deleteProduct);

export default router;
