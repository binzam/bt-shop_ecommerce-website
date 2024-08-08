import { Order } from '../models/orderModel.js';

const deleteAllOrders = async () => {
  try {
    const result = await Order.deleteMany({});
    console.log(`Deleted ${result.deletedCount} orders.`);
  } catch (error) {
    console.error('Error deleting orders:', error);
  }
};
export default deleteAllOrders;
