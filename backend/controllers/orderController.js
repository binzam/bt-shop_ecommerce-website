import { Order, OrderItem } from '../models/orderModel.js';
import { Types } from 'mongoose';
import { createOrderItems, updateUserOrders } from '../utils/orderUtils.js';

const createOrder = async (req, res) => {
  try {
    const { newOrder } = req.body;
    const { user, orderItems, shippingAddress } = newOrder;

    if (!user || !orderItems || orderItems.length === 0 || !shippingAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const orderItemsToCreate = await createOrderItems(orderItems);
    await OrderItem.create(orderItemsToCreate);
    const totalAmount = orderItemsToCreate
      .reduce((acc, item) => acc + item.totalItemPrice, 0)
      .toFixed(2);

    const order = await Order.create({
      user,
      orderItems: orderItemsToCreate,
      totalAmount,
      shippingAddress,
    });

    await updateUserOrders(user, order._id);

    return res.status(201).json({ orderCreated: true, order });
  } catch (error) {
    console.error(error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({
      orderCount: orders.length,
      allOrders: orders,
    });
  } catch (error) {
    console.log(error);
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

export { createOrder, getOrders, removeOrder };
