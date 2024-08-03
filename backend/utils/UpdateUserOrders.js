import { Order } from '../models/orderModel.js';
import { User } from '../models/userModel.js';

const updateUserOrders = async () => {
  try {
    const allOrders = await Order.find({});

    for (const order of allOrders) {
      const { user, _id } = order;

      const userWithOrder = await User.findOne({ _id: user, orders: _id });
      if (!userWithOrder) {
        await User.findByIdAndUpdate(user, {
          $push: { orders: _id },
        });
      }
    }

    console.log('User orders updated successfully');
  } catch (error) {
    console.error('Error updating user orders:', error);
  }
};

export default updateUserOrders;