import stripe from 'stripe';
import {
  createLineItems,
  createOrder,
  getShippingFromSession,
  updateOrderStatus,
} from '../utils/orderUtils.js';
import { getCartItems, saveCartItems } from '../utils/userUtils.js';

const getCheckoutSession = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { orderedItems, shippingAddress } = req.body;
    const { _id, email } = req.user;
    if (!orderedItems || orderedItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    await saveCartItems(_id, orderedItems);
    const orderItems = await createLineItems(orderedItems);
    const session = await stripeClient.checkout.sessions.create({
      client_reference_id: `${_id}`,
      customer_email: email,
      line_items: orderItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_BASE_URL}/checkout_success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/checkout`,
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });
   

    res.send({ stripeSession: session });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the payment session.' });
  }
};
const verifyPayment = async (req, res) => {
  const { sessionId } = req.body;
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);
    if (session) {
      await updateOrderStatus(sessionId, session.payment_status);
      return res.json({ status: session.payment_status });
    } else {
      return res.status(404).json({ error: 'Checkout session not found' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Error verifying payment' });
  }
};

const webhookCheckout = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;
    const orderedItems = await getCartItems(userId);
    const { shippingAddress } =
      await getShippingFromSession(session.id);

    await createOrder(orderedItems, shippingAddress, userId, session.id);
  }

  return res.status(200).send({ received: true });
};

export { getCheckoutSession, webhookCheckout, verifyPayment };
