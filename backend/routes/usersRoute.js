import express from 'express';
import {
  registerUser,
  getCurrentUser,
  connectUser,
  getUserById,
  forgotPassword,
  resetPassword,
  postFeedback,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/getme', requireAuth, getCurrentUser);
router.get('/:id', getUserById);
router.post('/register', registerUser);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);
router.post('/login', connectUser);
router.post('/feedback', postFeedback);
export default router;
