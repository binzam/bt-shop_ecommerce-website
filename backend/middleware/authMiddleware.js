import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  const token = authorization.split(' ')[1];
  if (!token || !token.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select('_id');

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export { verifyAdmin, requireAuth };
