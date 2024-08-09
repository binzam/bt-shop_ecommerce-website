import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import { Feedback } from '../models/feedbackModel.js';
import generateToken from '../utils/generateToken.js';
import sendResetPasswordEmail from '../utils/sendEmail.js';
import validator from 'validator';
import path from 'path';
const checkUndefined = (obj) => {
  const values = Object.values(obj);
  return values.every((value) => value !== undefined);
};
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      email: user.email,
      orders: checkUndefined(user.orders),
      profilePicture: user.profilePicture,
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
    console.log('user>>>', user);
    const token = generateToken(user._id);
    const userData = {
      token,
      username: user.username,
      email,
      role: user.role,
      profilePicture: user.profilePicture,
    };
    const cartData = user.cart.length > 0 ? user.cart : [];
    res.status(200).json({ userData, cartData });
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
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveCartItems = async (req, res) => {
  try {
    const user = req.user;
    const { cartItems } = req.body;
    for (const cartItem of cartItems) {
      const product = await Product.findById(cartItem._id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${cartItem._id} not found` });
      }
      const existingCartItem = user.cart.find(
        (item) => item._id.toString() === cartItem._id
      );
      if (existingCartItem) {
        existingCartItem.quantity = cartItem.quantity;
      } else {
        user.cart.push({
          _id: product._id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: cartItem.quantity,
          taxRate: cartItem.taxRate,
        });
      }
    }

    await user.save();
    console.log('user cart>>', user.cart);

    return res.status(200).json({
      cartSaved: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('filetyoe', req.file);

    const userId = req.user.id;
    const filePath = path.join('userUploads', req.file.filename);
    const profilePictureUrl = `${req.protocol}://${req.get(
      'host'
    )}/${filePath}`;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        profilePicture: profilePictureUrl,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      profilePictureUpdated: true,
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    console.log(error.message);
    if (error.message.startsWith('Invalid file type')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'An unexpected error occurred' });
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
  updateUserPassword,
  connectUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  postFeedback,
  uploadProfilePicture,
  saveCartItems,
};
