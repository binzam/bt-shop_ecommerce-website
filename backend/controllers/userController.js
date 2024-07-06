import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const getCurrentUser = async (req, res) => {
  const  user  = req.user;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      address: user.address,
    });
};

const connectUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (!user) {
      return res.status(500).json({ message: 'User Not Found' });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      token,
      username: user.username,
      email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    // const users = await User.find({}, 'username role email _id');
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
    const { currentPassword, newPassword } = req.body;
    const _id = req.user._id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invaild current password' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id,
      },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    const token = generateToken(updatedUser._id);
    return res.status(200).json({
      message: 'Password updated successfully',
      data: {
        token,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserShippingInfo = async (req, res) => {
  try {
    const _id = req.user._id;
    const { address } = req.body;
    const { street, city, country, phoneNumber } = address;
    if (!street || !city || !country || !phoneNumber) {
      throw Error('All fields must be filled');
    }
    const updatedUser = await User.findOneAndUpdate(
      {
        _id,
      },
      {
        address: address,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = generateToken(updatedUser._id);
    return res.status(200).json({
      token,
      email: updatedUser.email,
      username: updatedUser.username,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUserPaymentInfo = async (req, res) => {
  try {
    const _id = req.user._id;
    const { creditCardInfo } = req.body;
    const { cardNumber, cardName, expiryDate, cvv } = creditCardInfo;

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      throw Error('All fields must be filled');
    }
    const updatedUser = await User.findOneAndUpdate(
      {
        _id,
      },
      {
        creditCardInfo: creditCardInfo,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = generateToken(updatedUser._id);
    return res.status(200).json({
      token,
      email: updatedUser.email,
      username: updatedUser.username,
      role: updatedUser.role,
    });
  } catch (error) {
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

    return res
      .status(200)
      .json({ userRemoveSuccess: true, message: 'User deleted successfully' });
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
  updateUserShippingInfo,
  updateUserPaymentInfo,
  getCurrentUser,
};
