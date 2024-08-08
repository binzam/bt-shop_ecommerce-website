import { Types } from 'mongoose';
import { Order } from '../models/orderModel.js';
import stripe from 'stripe';
import { clearUserCart, updateUserOrders } from './userUtils.js';

async function createOrderItems(items) {
  return Promise.all(
    items.map(async (item) => {
      const { _id, quantity, price, taxRate, title, image } = item;

      if (!Types.ObjectId.isValid(_id)) {
        throw new Error(`Invalid product ID: ${_id}`);
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
        product: _id,
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
async function createLineItems(orderedItems) {
  const orderItems = [];

  for (const item of orderedItems) {
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


async function updateOrderStatus(sessionId, newStatus) {
  const order = await Order.findOne({ 'payment.paymentId': sessionId });

  if (order) {
    order.payment.paymentStatus = newStatus;
    await order.save();
  }
}

async function createOrder(orderedItems, shippingAddress, userId, sessionId) {
  try {
   
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

    await updateUserOrders(userId, order._id);
    await clearUserCart(userId);

   
    return order;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
const getShippingFromSession = async (sessionId) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    const shippingAddress = JSON.parse(session.metadata.shippingAddress);

    return { shippingAddress };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  createOrderItems,
  createLineItems,
  updateUserOrders,
  updateOrderStatus,
  createOrder,
  getShippingFromSession,
};
