import { User } from '../models/userModel.js';

const clearAllCarts = async () => {
  try {
    await User.updateMany({}, { $set: { cart: [] } });
    console.log('User carts cleared successfully');
  } catch (error) {
    console.error('Error clearing user carts:', error);
  }
};
export default clearAllCarts;