import express from 'express';
import {
  registerUser,
  getUsers,
  getUserById,
  deleteUser,
  connectUser,
  updateUserPassword,
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
router.route('/:id').get(getUserById).delete(deleteUser);
// update user password
router.route('/update_pass/:id').put(updateUserPassword)
export default router;
