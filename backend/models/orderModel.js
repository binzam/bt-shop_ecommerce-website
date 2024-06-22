// import { Schema, model } from 'mongoose';

// const orderSchema = new Schema(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     products: [
//       {
//         product: {
//           type: Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     shippingAddress: {
//       street: String,
//       city: String,
//       country: String,
//     },
//     status: {
//       type: String,
//       enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
//       default: 'Pending',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Order = model('Order', orderSchema);

// export default Order;
