import express from 'express';
import multer from 'multer';
import {
  registerUser,
  getCurrentUser,
  connectUser,
  forgotPassword,
  resetPassword,
  postFeedback,
  updateUserShippingInfo,
  updateUserPaymentInfo,
  uploadProfilePicture,
  saveCartItems,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
// import { handleError } from '../middleware/errorMiddleware.js';
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'userUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png'];
  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(
      new Error('Invalid file type. Only JPEG and PNG files are allowed.'),
      false
    );
  }
  cb(null, true);
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8000000 },
});
router.get('/getme', requireAuth, getCurrentUser);
router.post('/register', registerUser);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);
router.post('/login', connectUser);
router.post('/feedback', postFeedback);
router.post('/cart', requireAuth, saveCartItems);
router.post(
  '/upload_image',
  requireAuth,
  upload.single('profilePicture'),
  uploadProfilePicture
);
router.put('/update_payment', requireAuth, updateUserPaymentInfo);
router.put('/update_shipping', requireAuth, updateUserShippingInfo);

// router.use(handleError)
export default router;
