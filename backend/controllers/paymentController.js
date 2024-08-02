import stripe from 'stripe';
import { updateOrderStatus } from '../utils/orderUtils.js';

const getCheckoutSession = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { cartItems, orderId } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    // console.log('cartItems>>', cartItems);
    const session = await stripeClient.checkout.sessions.create({
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${process.env.CLIENT_SUCCESS_URL}`,
      cancel_url: `${process.env.CLIENT_CANCEL_URL}`,
      orderId: req.orderId,
    });
    console.log('line 33>>', session);

    res.json({ sessionUrl: session.url });
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
      console.log('checkoutSessionCompleted>>>', checkoutSessionCompleted);

      const orderId = checkoutSessionCompleted.orderId;
      await updateOrderStatus(orderId, 'paid');
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
};

export { getCheckoutSession, webhookCheckout };
