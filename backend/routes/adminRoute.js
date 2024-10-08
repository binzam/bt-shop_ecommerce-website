import express from 'express';
import { requireAuth, verifyAdmin } from '../middleware/authMiddleware.js';
import {
  getUsers,
  deleteUser,
  addNewProduct,
  getUserById,
  deleteProduct,
  removeOrder,
  getAllFeedbacks,
  getOrders,
  getOrderById,
} from '../controllers/adminController.js';
const router = express.Router();

router.get('/users', requireAuth, verifyAdmin, getUsers);
router.get('/orders', getOrders);
router.get('/users/:id', requireAuth, verifyAdmin, getUserById);
router.get('/orders/:id', getOrderById);
router.delete('/remove_user/:id', requireAuth, verifyAdmin, deleteUser);
router.delete('/remove_order/:id', requireAuth, verifyAdmin, removeOrder);
router.delete('/remove_product/:id', requireAuth, verifyAdmin, deleteProduct);
router.get('/feedbacks', getAllFeedbacks);
router.post('/add_product', requireAuth, verifyAdmin, addNewProduct);

export default router;
