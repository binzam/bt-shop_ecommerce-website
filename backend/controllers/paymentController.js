import stripe from 'stripe';
import {
  createLineItems,
  createOrder,
  updateOrderStatus,
} from '../utils/orderUtils.js';

const getCheckoutSession = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { cartItems, shippingAddress } = req.body;
    const { _id, email } = req.user;
    const userId = req.user._id;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    const orderItems = await createLineItems(cartItems);
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
    });
    const order = await createOrder(
      cartItems,
      shippingAddress,
      userId,
      session.id
    );

    res.send({ stripeSession: session, orderId: order._id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the payment session.' });
  }
};
const verifyPayment = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  const { sessionId, orderId } = req.body;
  try {
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      await updateOrderStatus(`${orderId}`, 'Paid');
    }
    return res.json({ status: session.payment_status });
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
    // console.log('sessjon>>> ', session);

    try {
      //update order payment status to 'paid'
      // await updateOrderStatus(req.user._id, 'Paid')
    } catch (error) {
      return res.status(404).send({ error, session });
    }
  }

  return res.status(200).send({ received: true });
};

export { getCheckoutSession, webhookCheckout, verifyPayment };
