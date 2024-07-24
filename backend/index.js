import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';
import usersRoute from './routes/usersRoute.js';
import ordersRoute from './routes/ordersRoute.js';
import adminRoute from './routes/adminRoute.js';
// import resetUserOrders from './utils/resetUserOrders.js';
// import updateUserOrders from './utils/UpdateUserOrders.js';
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors())
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
// resetUserOrders()
// updateUserOrders()
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

