import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const connectUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password)
    
    const token = generateToken(user._id);
    res.status(200).json({
      token,
      _id: user._id,
      username: user.username,
      email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const username = `${firstName} ${lastName}`;
  try {
    const user = await User.signup(email, password, username);

    const token = generateToken(user._id);

    return res.status(200).json({
      token,
      _id: user._id,
      username,
      email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
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
};
const getUserById = async (req, res) => {
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
};

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
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
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(500).json({ error: 'Invaild password' });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        password: newHashedPassword,
      },
      {
        new: true,
      }
    );

    const token = generateToken(updatedUser._id);
    return res.status(200).json({
      message: 'User updated successfully',
      data: {
        token,
        username: updatedUser.username,
        email: updatedUser.email,
        _id: updatedUser._id,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
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
};
export {
  registerUser,
  getUsers,
  getUserById,
  updateUserPassword,
  deleteUser,
  connectUser,
};
