import { User } from '../models/userModel.js';
import { Order } from '../models/orderModel.js';
import { Feedback } from '../models/feedbackModel.js';

const getUsers = async (req, res) => {
  try {
    // const users = await User.find({});
    // const users = await User.find({}, 'username role email _id');
    // In your user controller or route
    // const users = await User.find({}).populate('orders');
    const users = await User.find({}, '-password -updatedAt -v -address');
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
    const user = await User.findById({ _id: id }, '-password').populate(
      'orders'
    );
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
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findById({ _id: id });
    if (!orders) {
      return res.status(400).json({
        message: 'Order not found',
      });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.deleteMany({ user: id });
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      userRemoved: true,
      message: 'User and their orders deleted successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { title, category, description, image, price } = req.body;
    if (!title || !category || !description || !image || !price) {
      return res.status(400).json({
        message: 'Send all required fields',
      });
    }
    const newProduct = {
      title,
      category,
      description,
      image,
      price,
    };
    const product = await Product.create(newProduct);
    return res.status(201).json({ productAdded: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, category, description, image, price, ratingCount, rating } =
      req.body;
    if (
      !title ||
      !category ||
      !description ||
      !image ||
      !price ||
      !ratingCount ||
      !rating
    ) {
      return res.status(400).json({
        message: 'Send all required fields',
      });
    }

    const { id } = req.params;

    const result = await Product.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ productRemoved: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Order.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({
      orderRemoved: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    return res.status(200).json({
      feedbackCount: feedbacks.length,
      allFeedbacks: feedbacks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user');
    return res.status(200).json({
      orderCount: orders.length,
      allOrders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getUsers,
  deleteUser,
  addNewProduct,
  updateProduct,
  deleteProduct,
  removeOrder,
  getAllFeedbacks,
  getOrders,
  getUserById,
  getOrderById,
};
