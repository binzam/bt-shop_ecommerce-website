import express from 'express';
import { User } from '../models/userModel.js';
const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find({});
//     return res.status(200).json({
//       userCount: users.length,
//       data: users,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });
// router.post('/', async (req, res) => {
//   try {
//     if (
//       !req.body.title ||
//       !req.body.category ||
//       !req.body.description ||
//       !req.body.image ||
//       !req.body.price ||
//       !req.body.ratingCount ||
//       !req.body.rating
//     ) {
//       return res.status(400).json({
//         message: 'Send all required fields',
//       });
//     }
//     const newUser = {
//       title: req.body.title,
//       category: req.body.category,
//       description: req.body.description,
//       image: req.body.image,
//       price: req.body.price,
//       ratingCount: req.body.ratingCount,
//       rating: req.body.rating,
//     };
//     const user = await User.create(newUser);
//     return res.status(201).json(user);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });
// router.put('/:id', async (req, res) => {
//   try {
//     if (
//       !req.body.title ||
//       !req.body.category ||
//       !req.body.description ||
//       !req.body.image ||
//       !req.body.price ||
//       !req.body.ratingCount ||
//       !req.body.rating
//     ) {
//       return res.status(400).json({
//         message: 'Send all required fields',
//       });
//     }

//     const { id } = req.params;

//     const result = await User.findByIdAndUpdate(id, req.body);

//     if (!result) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await User.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
