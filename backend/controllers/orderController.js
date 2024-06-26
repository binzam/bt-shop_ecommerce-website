import { Order } from '../models/orderModel.js';

const createOrder = async (req, res) => {
  const { customerData, cartItemData } = req.body;
  const { user } = req;
  console.log('iser', user);
  console.log('cust daaata', customerData);
  console.log('cartitem data', cartItemData);
  const newOrder = {
    user: req.user._id,
    orders: [
      { product: cartItemData[0].productId },
      { quantity: cartItemData[0].quantity },
      { price: cartItemData[0].price },
    ],
    totalAmount: cartItemData[0].quantity ,

  };

  const createdOrder = await Order.create(newOrder);

  res.status(201).json(createdOrder);
  console.log('new order', newOrder);
};

export { createOrder };
