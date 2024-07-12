import { Schema, model, Types } from 'mongoose';
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
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: String,
      required: true,
      default: 0.0,
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
