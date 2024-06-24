import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res) => {
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
    if (savedUser) {
      const token = generateToken(savedUser._id);

      return res.status(201).json({
        token,
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async(req, res)=>{
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
}
const getUserById = async(req, res)=>{
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
}

const updateUser = async(req, res)=>{
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
        return res
          .status(200)
          .json({ message: 'User updated successfully', token, user });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
}
const deleteUser = async(req, res)=>{
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
}
export { registerUser, getUsers, getUserById, updateUser, deleteUser };
