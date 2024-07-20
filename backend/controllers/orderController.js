import { Order, OrderItem } from '../models/orderModel.js';
import { User } from '../models/userModel.js';

const createOrder = async (req, res) => {
  try {
    const { orderObj } = req.body;
    const { user, orderItems, shippingAddress } = orderObj;

    if (!user || !orderItems || orderItems.length === 0 || !shippingAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the order items
    const orderItemsToCreate = await Promise.all(
      orderItems.map(async (item) => {
        const { product, quantity, price, taxRate } = item;
        const itemPrice = parseFloat((quantity * price).toFixed(2));
        const tax = parseFloat((itemPrice * taxRate).toFixed(2));
        const totalItemPrice = itemPrice + tax;

        return new OrderItem({
          product,
          quantity,
          price,
          itemPrice,
          tax,
          totalItemPrice,
        });
      })
    );

    const totalAmount = orderItemsToCreate.reduce(
      (acc, item) => acc + item.totalItemPrice,
      0
    );
    const order = await Order.create({
      user,
      orderItems: orderItemsToCreate,
      totalAmount,
      shippingAddress,
    });

    await User.findByIdAndUpdate(user, { $push: { orders: order._id } });

    return res.status(201).json({ orderCreated: true, order });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
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

export { createOrder, getOrders, getOrdersById, removeOrder };
