import { Order } from '../models/orderModel.js';

const createOrder = async (req, res) => {
  try {
    const { newOrder } = req.body;
    const { user, orders, totalAmount, address } = newOrder;

    const order = await Order.create({
      user,
      orders,
      totalAmount,
      shippingAddress: address,
    });
    if (!order) {
      return res
        .status(500)
        .json({ message: 'An error occurred while creating the order' });
    }
    return res.status(200).json({ orderCreated: true, orderId: order._id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while creating the order' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    // const orders = await order.find({}, 'username role email _id');
    return res.status(200).json({
      orderCount: orders.length,
      data: orders,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const getOrdersById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: 'Order not found',
      });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getOrders, getOrdersById };
