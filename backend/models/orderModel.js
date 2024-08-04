import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
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
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        itemPrice: {
          type: Number,
          min: 0,
        },
        tax: {
          type: Number,
          min: 0,
        },
        totalItemPrice: {
          type: Number,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingAddress: {
      street: String,
      city: String,
      country: String,
    },
    shippingCompany: {
      type: String,
      enum: ['Fedex', 'DHL'],
      default: 'DHL',
    },
    payment: {
      paymentId: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'],
        default: 'Credit Card',
      },
      paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
      },
    },
    orderStatus: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model('Order', orderSchema);
