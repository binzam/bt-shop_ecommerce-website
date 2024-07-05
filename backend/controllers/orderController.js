import { Order } from '../models/orderModel.js';

const createOrder = async (req, res) => {
  try {
    const { user, orders, totalAmount, shippingAddress, status } = req.body;

    const order = await Order.create({
      user,
      orders,
      totalAmount,
      shippingAddress,
      status,
    });

    return res
      .status(201)
      .json({ orderCreated: true, message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while creating the order' });
  }
};

export { createOrder };
