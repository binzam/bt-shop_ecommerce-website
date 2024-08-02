import { Types } from 'mongoose';
import { User } from '../models/userModel.js';
import { Order } from '../models/orderModel.js';

async function createOrderItems(items) {
  return Promise.all(
    items.map(async (item) => {
      const { product, quantity, price, taxRate, title, image } = item;

      if (!Types.ObjectId.isValid(product)) {
        throw new Error(`Invalid product ID: ${product}`);
      }

      if (quantity <= 0) {
        throw new Error(`Invalid quantity: ${quantity}`);
      }

      if (price <= 0) {
        throw new Error(`Invalid price: ${price}`);
      }

      if (taxRate < 0 || taxRate > 1) {
        throw new Error(`Invalid tax rate: ${taxRate}`);
      }

      const itemPrice = parseFloat((quantity * price).toFixed(2));
      const tax = parseFloat((itemPrice * taxRate).toFixed(2));
      const totalItemPrice = itemPrice + tax;

      const orderItem = {
        product,
        title,
        image,
        quantity,
        price,
        itemPrice,
        tax,
        totalItemPrice,
      };
      return orderItem;
    })
  );
}

// update the user's order history
async function updateUserOrders(userId, orderId) {
  return User.findByIdAndUpdate(
    userId,
    { $push: { orders: orderId } },
    { new: true }
  );
}
async function updateOrderStatus(orderId, newStatus) {
  console.log('utils line 54>>', orderId);
  
  return Order.findByIdAndUpdate(
    orderId,
    { $set: { paymentStatus: newStatus } },
    { new: true }
  );
}
export { createOrderItems, updateUserOrders, updateOrderStatus };
