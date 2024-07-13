import { Schema, model } from 'mongoose';
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orders: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0.00,
    },
    shippingAddress: {
      street: String,
      city: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ['Credit card', 'other'],
      default: 'Credit card',
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model('Order', orderSchema);
// Order.updateMany(
//     {},
//     { $set: { 'orders.$[].price': { $toNumber: '$orders.price' } } },
//     { multi: true }
//   )