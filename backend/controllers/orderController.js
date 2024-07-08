import { Order } from '../models/orderModel.js';

const createOrder = async (req, res) => {
  try {
    const { order } = req.body;
    console.log('order:', order);
    const { user, orders, totalAmount, address } = order;
    if (!user || !orders || !orders.length > 0 || !totalAmount || !address) {
      throw Error('You have no Orders to be Placed');
    }
    const existingOrder = await Order.findOne({ user, orders, totalAmount, address });
    if (existingOrder) {
      return res.status(400).json({ message: 'Order already exists' });
    } else {
      const newOrder = await Order.create({
        user,
        orders,
        totalAmount,
        shippingAddress: address,
      });
      if (!newOrder) {
        return res
          .status(500)
          .json({ message: 'An error occurred while creating the order' });
      }

      return res.status(200).json({ orderCreated: true, order: newOrder });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    // const orders = await order.find({}, 'username role email _id');
    return res.status(200).json({
      orderCount: orders.length,
      allOrders: orders,
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
const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await Order.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({
      OrderRemoveSuccess: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getOrders, getOrdersById, removeOrder };
