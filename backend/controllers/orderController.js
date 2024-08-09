import { Order } from '../models/orderModel.js';

const getOrdersByUser = async (req, res) => {
  try {
    const { user } = req;

    const orders = await Order.find({
      user: user._id,
      orderStatus: { $ne: 'Cancelled' },
    }).populate('user');
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
    res.json({ orderCancelled: true, message: 'Order canceled successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error canceling the order.' });
  }
};

export { getOrdersByUser, cancelUserOrder };
