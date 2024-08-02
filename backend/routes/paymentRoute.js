import {
  getCheckoutSession,
  webhookCheckout,
} from '../controllers/paymentController.js';
import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post(
  '/create_checkout_session',
  express.json(),
  requireAuth,
  getCheckoutSession
);
router.post(
  '/webhook_checkout',
  express.raw({ type: 'application/json' }),
  webhookCheckout
);

export default router;
