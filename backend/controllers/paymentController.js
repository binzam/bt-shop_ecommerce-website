import stripe from 'stripe';
import { createLineItems, updateOrderStatus } from '../utils/orderUtils.js';

const getCheckoutSession = async (req, res, next) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { orderedItems } = req.body;
    const { _id, email } = req.user;
    if (!orderedItems || orderedItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    const orderItems = await createLineItems(orderedItems);
    const session = await stripeClient.checkout.sessions.create({
      client_reference_id: `${_id}`,
      customer_email: email,
      line_items: orderItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_BASE_URL}/checkout_success`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/checkout`,
      automatic_tax: {
        enabled: true,
      },
    });

    res.send({ stripeSession: session });
    next();
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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('sessjon>>> ', session);

    try {
      //update order payment status to 'paid'
      // await updateOrderStatus(req.user._id, 'Paid')
    } catch (error) {
      return res.status(404).send({ error, session });
    }
  }

  return res.status(200).send({ received: true });
};

export { getCheckoutSession, webhookCheckout };
