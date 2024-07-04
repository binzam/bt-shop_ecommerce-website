import express from 'express';
import {
  postFeedback,
  getAllFeedbacks,
} from '../controllers/feedbackController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, postFeedback);
router.get('/', getAllFeedbacks);

export default router;
