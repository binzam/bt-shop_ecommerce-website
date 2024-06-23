import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();
// get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      userCount: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// get user by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// add/create user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const username = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };
    const savedUser = await User.create(newUser);
    const token = generateToken(savedUser._id);
    return res.status(201).json({ token, user: savedUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const username = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    const token = generateToken(user._id);
    return res.status(200).json({ message: 'User updated successfully', token, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
