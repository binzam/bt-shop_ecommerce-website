import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const OrdersPage = () => {
  const { user } = useAuthContext();
  const createOrder = async (orderData) => {
    try {
      const response = await axios.post(
        'http://localhost:5555/orders',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create the order. Please try again.');
    }
  };

  const newOrder = {
    user: user._id,
    orders: [
      {
        product: 'product_id',
        quantity: 4,
        price: .99,
      },
    ],
    totalAmount: 51.98,
    shippingAddress: {
      street: '',
      city: '',
      country: '',
    },
    status: 'Pending',
  };

  createOrder(newOrder)
    .then((createdOrder) => {
      console.log('Order created successfully:', createdOrder);
    })
    .catch((error) => {
      console.error('Error creating order:', error.message);
    });

  return <div>OrdersPage</div>;
};

export default OrdersPage;
