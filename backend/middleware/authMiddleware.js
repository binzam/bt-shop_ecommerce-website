import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const getCredFromAuthToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id).select('-password');
    next;
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export { verifyAdmin, getCredFromAuthToken };
