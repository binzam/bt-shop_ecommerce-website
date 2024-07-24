import express from 'express';
import multer from 'multer';
import {
  registerUser,
  getCurrentUser,
  connectUser,
  getUserById,
  forgotPassword,
  resetPassword,
  postFeedback,
  updateUserShippingInfo,
  updateUserPaymentInfo,
  uploadProfilePicture,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
// import { handleError } from '../middleware/errorMiddleware.js';
const router = express.Router();
// / Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'userUploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});

// Create the Multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});
router.get('/getme', requireAuth, getCurrentUser);
router.get('/:id', getUserById);
router.post('/register', registerUser);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);
router.post('/login', connectUser);
router.post('/feedback', postFeedback);
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
