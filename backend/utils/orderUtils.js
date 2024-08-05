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
async function createLineItems(cartItems) {
  const orderItems = [];

  for (const item of cartItems) {
    const { title, quantity, price, image, taxRate } = item;
    const tax = parseFloat((price * taxRate).toFixed(2));
    const totalItemPrice = price + tax;
    const lineItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: title,
          images: [image],
        },
        unit_amount: Math.round(totalItemPrice * 100),
      },
      quantity,
    };

    orderItems.push(lineItem);
  }

  return orderItems;
}

async function updateUserOrders(userId, orderId) {
  return User.findByIdAndUpdate(
    userId,
    { $push: { orders: orderId } },
    { new: true }
  );
}
async function updateOrderStatus(orderId, newStatus) {
  return Order.findByIdAndUpdate(
    orderId,
    { $set: { paymentStatus: newStatus } },
    { new: true }
  );
}
async function createOrder(cartItems, shippingAddress, userId, sessionId) {
  try {

    const orderedItems = cartItems.map(
      ({ _id, quantity, price, taxRate, title, image }) => ({
        product: _id,
        quantity,
        price,
        taxRate,
        title,
        image,
      })
    );
    const orderItemsToCreate = await createOrderItems(orderedItems);
    const totalAmount = orderItemsToCreate
      .reduce((acc, item) => acc + item.totalItemPrice, 0)
      .toFixed(2);

    const order = await Order.create({
      user: userId,
      orderItems: orderItemsToCreate,
      totalAmount,
      shippingAddress: shippingAddress,
      'payment.paymentId': sessionId,
    });

    const updatedUser = await updateUserOrders(userId, order._id);

    await User.findByIdAndUpdate(userId, {
      $set: { cart: [] },
    });
    return order;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
export {
  createOrderItems,
  createLineItems,
  updateUserOrders,
  updateOrderStatus,
  createOrder,
};
