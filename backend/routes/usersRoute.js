import express from 'express';
import {
  registerUser,
  getUsers,
  getCurrentUser,
  deleteUser,
  connectUser,
  updateUserPassword,
  updateUserShippingInfo,
  updateUserPaymentInfo,
  getUserById,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';
import { requireAuth, verifyAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

// get current user
router.get('/getme', requireAuth, getCurrentUser);
// get all users
router.get('/', getUsers);
router.get('/:id', getUserById);
// add/create user
router.post('/register', registerUser);
router.post('/forgot_password', forgotPassword);
router.get('/reset_password/:token', resetPassword);
// login user
router.post('/login', connectUser);
router.put('/update_user', requireAuth, updateUserShippingInfo);
router.put('/update_payment', requireAuth, updateUserPaymentInfo);

// get user by id, update user, delete user

// router.delete('/remove_user/:id', requireAuth, verifyAdmin, deleteUser);
router.delete('/remove_user/:id', requireAuth, verifyAdmin, deleteUser);
// update user password
router.route('/update_pass').put(requireAuth, updateUserPassword);
export default router;
