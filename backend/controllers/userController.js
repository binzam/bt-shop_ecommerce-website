import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import sendResetPasswordEmail from '../utils/sendEmail.js';

const checkUndefined = (obj) => {
  const values = Object.values(obj);
  if (values.includes(undefined)) {
    return null;
  }
  return obj;
};
const getCurrentUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userData = {
    _id: user._id,
    email: user.email,
    address: checkUndefined(user.address),
    creditCardInfo: checkUndefined(user.creditCardInfo),
  };
  return res.status(200).json(userData);
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
    // const users = await User.find({});
    // const users = await User.find({}, 'username role email _id');
    // In your user controller or route
    const users = await User.find({}).populate('orders');
    if (!users) {
      return res.status(400).json({ error: 'Users Not found' });
    }
    return res.status(200).json({
      userCount: users.length,
      allUsers: users,
    });
  } catch (error) {
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
      passwordChangeSuccess: true,
      data: {
        token,
        email: updatedUser.email,
        username: updatedUser.username,
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ error: 'Invalid email' });
    }
    const token = generateToken(user._id);
    user.resetToken = token;
    await user.save();
    const { success, message, error } = await sendResetPasswordEmail(
      user.email,
      token
    );
    if (success) {
      return res.status(200).json({ emailSent: true, message });
    } else {
      return res.status(500).json({ message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const resetPassword = (req, res) => {
  const { resetToken } = req.body;
  const user = User.findOne({ resetToken });
  if (user) {
    user.password = password;
    delete user.resetToken;
    res.status(200).json({ message: 'Password updated successfully' });
  } else {
    res.status(404).json({ message: 'Invalid or expired token' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ userRemoved: true, message: 'User deleted successfully' });
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
  forgotPassword,
  resetPassword,
};
