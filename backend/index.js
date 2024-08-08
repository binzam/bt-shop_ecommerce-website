import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';
import usersRoute from './routes/usersRoute.js';
import ordersRoute from './routes/ordersRoute.js';
import adminRoute from './routes/adminRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import path from 'path';
// import resetUserOrders from './utils/resetUserOrders.js';
// import updateUserOrders from './utils/UpdateUserOrders.js';
// import clearAllCarts from './utils/clearAllCarts.js';
// import deleteAllOrders from './utils/deleteAllOrders.js';
const app = express();
app.use(cors());
app.use('/userUploads', express.static(path.resolve('userUploads')));
app.use('/public', express.static(path.resolve('public')));
app.use('/api/payment', paymentRoute);
app.use(express.json());
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
// resetUserOrders()
// updateUserOrders()
// clearAllCarts()
// deleteAllOrders()
app.get('/', (req, res) => {
  return res.status(200).json('Welcome to bt-shop');
});

app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/admin', adminRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
