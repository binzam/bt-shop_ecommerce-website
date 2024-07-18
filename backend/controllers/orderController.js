import { Order } from '../models/orderModel.js';

const createOrder = async (req, res) => {
  try {
    const { order } = req.body;
    const { user, orders, totalAmount, address } = order;
    if (!user || !orders || !orders.length > 0 || !totalAmount || !address) {
      throw Error('You have no Orders to be Placed');
    }
    const existingOrder = await Order.findOne({
      user,
      orders,
      totalAmount,
      address,
    });
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
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('orders.product')
      .populate('user', '-password');
    const formattedOrders = orders.map((order) => {
      const totalOrderAmount = order.orders.reduce((acc, item) => {
        const itemTotalPrice = item.product.price * item.quantity;
        const itemTax =
          item.product.price * item.product.taxRate * item.quantity;
        return acc + itemTotalPrice + itemTax;
      }, 0);

      return {
        _id: order._id,
        user: order.user ? {
          _id: order.user._id,
          username: order.user.username,
          email: order.user.email,
          address: order.user.address,
        } : null,
        orders: order.orders.map((item) => ({
          _id: item._id,
          product: {
            _id: item.product._id,
            title: item.product.title,
            image: item.product.image,
            price: item.product.price,
            taxRate: item.product.taxRate,
          },
          quantity: item.quantity,
          tax: item.product.price * item.product.taxRate * item.quantity,
          itemPrice: item.product.price * item.quantity,
          totalItemPrice: item.product.price * item.quantity + item.product.price * item.product.taxRate * item.quantity,
        })),
        totalAmount: totalOrderAmount.toFixed(2),
        shippingAddress: order.shippingAddress,
        status: order.status,
        shippingCompany: order.shippingCompany,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
    });

    return res.status(200).json({
      orderCount: orders.length,
      allOrders: formattedOrders,
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
