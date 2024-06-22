import express from 'express';
import { Product } from '../models/productModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      productCount: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.category ||
      !req.body.description ||
      !req.body.image ||
      !req.body.price ||
      !req.body.ratingCount ||
      !req.body.rating
    ) {
      return res.status(400).json({
        message: 'Send all required fields',
      });
    }
    const newProduct = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      ratingCount: req.body.ratingCount,
      rating: req.body.rating,
    };
    const product = await Product.create(newProduct);
    return res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.category ||
      !req.body.description ||
      !req.body.image ||
      !req.body.price ||
      !req.body.ratingCount ||
      !req.body.rating
    ) {
      return res.status(400).json({
        message: 'Send all required fields',
      });
    }

    const { id } = req.params;

    const result = await Product.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
