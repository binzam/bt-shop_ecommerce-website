import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0.0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    taxRate: {
      type: Number,
      required: true,
      default: 0.15,
      min: 0,
      max: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model('Product', productSchema);

// Product.updateMany(
//   {},
//   {
//     $set: {
//       rating: { $toNumber: '$rating' },
//       ratingCount: { $toNumber: '$ratingCount' },
//     },
//   },
//   { multi: true }
// );
