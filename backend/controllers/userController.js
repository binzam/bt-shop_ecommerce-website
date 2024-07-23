import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import { Feedback } from '../models/feedbackModel.js';
import generateToken from '../utils/generateToken.js';
import sendResetPasswordEmail from '../utils/sendEmail.js';
import validator from 'validator';

const checkUndefined = (obj) => {
  const values = Object.values(obj);
  if (values.includes(undefined)) {
    return null;
  }
  return obj;
};
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      _id: user._id,
      email: user.email,
      address: checkUndefined(user.address),
      creditCardInfo: checkUndefined(user.creditCardInfo),
      orders: checkUndefined(user.orders),
    };
    return res.status(200).json(userData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
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
      userId: user._id,
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
      return res.status(404).json({ error: 'User NOT found' });
    }
    const token = generateToken(user._id);
    user.resetToken = token;
    await user.save();
    const { success, message, error } = await sendResetPasswordEmail(
      user.email,
      token
    );
    console.log('1', error);

    if (success) {
      return res.status(200).json({ emailSent: true, message });
    } else {
      return res.status(500).json({ error });
    }
  } catch (error) {
    console.log('2', error);
    res.status(500).json({ error: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Reset token is required' });
    }

    if (!newPassword || !validator.isStrongPassword(newPassword)) {
      return res.status(400).json({
        error: 'Password not strong enough',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await User.findOneAndUpdate(
      { resetToken: token },
      {
        $set: {
          password: hashedPassword,
          resetToken: null,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Invalid reset token' });
    }
    return res.status(200).json({
      message: 'password changed successfully',
      resetPasswordSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const postFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email || !name || !message) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    await Feedback.create({
      name,
      email,
      message,
    });
    return res.status(200).json({ feedbackSubmitted: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message, feedbackSubmitted: false });
  }
};
export {
  registerUser,
  getUserById,
  updateUserPassword,
  connectUser,
  updateUserShippingInfo,
  updateUserPaymentInfo,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  postFeedback,
};
