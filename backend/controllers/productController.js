import { Product } from '../models/productModel.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, '-updatedAt -createdAt -__v');
    return res.status(200).json({
      productCount: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        message: 'Product not found',
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const addNewProduct = async (req, res) => {
  try {
    const { title, category, description, image, price } = req.body;
    if (!title || !category || !description || !image || !price) {
      return res.status(400).json({
        message: 'Send all required fields',
      });
    }
    const newProduct = {
      title,
      category,
      description,
      image,
      price,
    };
    const product = await Product.create(newProduct);
    return res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, category, description, image, price, ratingCount, rating } =
      req.body;
    if (
      !title ||
      !category ||
      !description ||
      !image ||
      !price ||
      !ratingCount ||
      !rating
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
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ productRemoved: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const submitRating = async (req, res) => {
  const { productId, rating } = req.body;

  try {
    const product = await Product.findById(productId);
    const existingRatingCount = parseInt(product.ratingCount);
    const existingRatingTotal =
      parseFloat(product.rating) * existingRatingCount;
    const newRatingCount = existingRatingCount + 1;
    const newRatingTotal = existingRatingTotal + parseFloat(rating);
    const newAverageRating = newRatingTotal / newRatingCount;

    product.rating = newAverageRating.toFixed(1);
    product.ratingCount = newRatingCount;
    await product.save();

    res.status(200).json({ rateSubmited: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ rateSubmited: false, message: 'Error submitting rating' });
  }
};

export {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  submitRating,
};
