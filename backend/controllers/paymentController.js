import stripe from 'stripe';
import { createLineItems } from '../utils/orderUtils.js';
import { createOrder } from './orderController.js';

const getCheckoutSession = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { orderedItems } = req.body;
    const userId = req.user._id
    if (!orderedItems || orderedItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    const orderItems = await createLineItems(orderedItems);
    const session = await stripeClient.checkout.sessions.create({
      line_items: orderItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_BASE_URL}/checkout_success`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/checkout`,
      automatic_tax: {
        enabled: true,
      },
    });

    res.send({ stripeSession: session });
    await createOrder(orderedItems, userId);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the payment session.' });
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

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
};

export { getCheckoutSession, webhookCheckout };
