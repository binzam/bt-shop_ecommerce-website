import { Order } from '../models/orderModel.js';
import { User } from '../models/userModel.js';
import { createOrderItems, updateUserOrders } from '../utils/orderUtils.js';

const createOrder = async (req, res) => {
  try {
    const { orderedItems } = req.body;
    const userId = req.user._id;
    const orderItemsToCreate = await createOrderItems(orderedItems);
    const totalAmount = orderItemsToCreate
      .reduce((acc, item) => acc + item.totalItemPrice, 0)
      .toFixed(2);

    const order = await Order.create({
      user: userId,
      orderItems: orderItemsToCreate,
      totalAmount,
    });

    const updatedUser = await updateUserOrders(userId, order._id);

    await User.findByIdAndUpdate(updatedUser._id, {
      $set: { cart: [] },
    });
    
  } catch (error) {
    console.error(error.message);
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const { user } = req;

    const orders = await Order.find({
      user: user._id,
      orderStatus: { $ne: 'Cancelled' },
    }).populate('user');
    // console.log(orders);
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
const cancelUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    // console.log('order>>', order);
    if (order.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to cancel this order.' });
    }
    if (order.orderStatus !== 'Processing') {
      return res
        .status(400)
        .json({ message: 'This order cannot be canceled.' });
    }

    order.orderStatus = 'Cancelled';
    await order.save();
    // make this function call a util function to remove the order id from the users orders property
    res.json({ orderCancelled: true, message: 'Order canceled successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error canceling the order.' });
  }
};

export { createOrder, getOrdersByUser, cancelUserOrder };
