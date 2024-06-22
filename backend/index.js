import { PORT, mongoDbURL } from './config.js';
import express from 'express';
import mongoose from 'mongoose';
import productsRoute from './routes/productsRoute.js';
import usersRoute from './routes/usersRoute.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json('Welcome to bt-shop');
});

app.use('/products', productsRoute);
app.use('/users', usersRoute);

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
