import {
  getCheckoutSession,
  webhookCheckout,
  verifyPayment,
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
router.post('/verify_payment', express.json(), requireAuth, verifyPayment);

export default router;
