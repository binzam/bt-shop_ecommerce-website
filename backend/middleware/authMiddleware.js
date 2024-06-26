import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const getCredFromAuthToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log('token',  token);
    if (!token || !token.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    token = token.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded token',decodedToken);
    if(decodedToken){
      req.user = await User.findById(decodedToken.id);

    }
    next();
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
