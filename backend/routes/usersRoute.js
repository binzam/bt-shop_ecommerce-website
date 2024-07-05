import express from 'express';
import {
  registerUser,
  getUsers,
  getUserById,
  deleteUser,
  connectUser,
  updateUserPassword,
  updateUserInfo,
} from '../controllers/userController.js';
import { requireAuth, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// get all users
router.get('/', requireAuth, verifyAdmin, getUsers);
// add/create user
router.post('/register', registerUser);
// login user
router.post('/login', connectUser);
router.put('/update_user', requireAuth, updateUserInfo);

// get user by id, update user, delete user
router.route('/:id').get(requireAuth, verifyAdmin, getUserById);

router.delete('/remove/:id', requireAuth, verifyAdmin, deleteUser);
// update user password
router.route('/update_pass').put(requireAuth, updateUserPassword);
export default router;
