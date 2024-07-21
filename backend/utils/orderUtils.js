import { Types } from 'mongoose';
import { User } from '../models/userModel.js';
import { OrderItem } from '../models/orderModel.js';

async function createOrderItems(items) {
  return Promise.all(
    items.map(async (item) => {
      const { product, quantity, price, taxRate } = item;

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
}

// update the user's order history
async function updateUserOrders(userId, orderId) {
  return User.findByIdAndUpdate(
    userId,
    { $push: { orders: orderId } },
    { new: true }
  );
}

export { createOrderItems, updateUserOrders };
