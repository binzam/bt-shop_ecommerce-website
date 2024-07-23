import express from 'express';
import { requireAuth, verifyAdmin } from '../middleware/authMiddleware.js';
import {
  getUsers,
  deleteUser,
  addNewProduct,
  // updateProduct,
  deleteProduct,
  removeOrder,
  getAllFeedbacks,
  getOrders,
} from '../controllers/adminController.js';
const router = express.Router();

router.get('/users', getUsers);
router.get('/orders', getOrders);
router.delete('/remove_user/:id', requireAuth, verifyAdmin, deleteUser);
router.delete('/remove_order/:id', requireAuth, verifyAdmin, removeOrder);
router.delete('/remove_product/:id', requireAuth, verifyAdmin, deleteProduct);
router.get('/feedbacks', getAllFeedbacks);
router.post('/add_product', requireAuth, verifyAdmin, addNewProduct);
// router.put('/update_product/:id', requireAuth, verifyAdmin, updateProduct);

export default router;
