import express from 'express';
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  connectUser,
} from '../controllers/userController.js';
// import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// get all users
router.get('/', getUsers);
// add/create user
router.post('/register', registerUser);
// login user
router.post('/login', connectUser);

// get user by id, update user, delete user
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;
