import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// import crypto from 'crypto';
// import sendEmail from '../utils/sendEmail.js';
import nodemailer from 'nodemailer';

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

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = generateToken(user._id);
    user.resetToken = token;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'binyam.techan1@gmail.com',
        pass: 'season10episode24',
      },
    });
    const resetUrl = `http://localhost:5173/reset_password/${token}`;

    const mailOptions = {
      from: 'binyam.techan1@gmail.com',
      to: 'btechan@gmail.com',
      subject: 'Reset password for bt-shop',
      text: `
      Hello,

      You are receiving this email because you (or someone else) has requested the reset of your password.
      Please click on the following link to complete the process:

      ${resetUrl}

      If you did not request this, please ignore this email and your password will remain unchanged.

      Best regards,
      bt-shop
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res
          .status(200)
          .send('Check your email for instructions on resetting your password');
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleResetToken = (req, res) => {
  const { token, password } = req.body;
  // Find the user with the given token and update their password
  const user = User.findOne({ token });
  if (user) {
    user.password = password;
    delete user.resetToken; // Remove the reset token after the password is updated
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
  resetPassword,
  handleResetToken,
};
