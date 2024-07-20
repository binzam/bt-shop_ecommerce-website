import { User } from '../models/userModel.js';

const resetUserOrders = async () => {
  try {
    await User.updateMany({}, { $set: { orders: [] } });
    console.log('User orders reset successfully');
  } catch (error) {
    console.error('Error resetting user orders:', error);
  }
};
export default resetUserOrders;
