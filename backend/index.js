import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';
import usersRoute from './routes/usersRoute.js';
import ordersRoute from './routes/ordersRoute.js';

const app = express();
app.use(express.json());
app.use(cors())
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (req, res) => {
  return res.status(200).json('Welcome to bt-shop');
});

app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);

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
