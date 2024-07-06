// import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import './OrdersPage.css';
import OrderSummary from '../../components/OrderSummary';
const OrdersPage = () => {
  const { user } = useAuthContext();
  const { cartItems } = useContext(CartContext);
  const [userData, setUserData] = useState([]);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return parseInt(total.toFixed(2), 10);
  };
  const calculateTax = () => {
    return calculateTotal() * (0.15).toFixed(2);
  };
  const totalAmount = (calculateTax() + calculateTotal()).toFixed(2);
  useEffect(() => {
    if (user) {
      const getme = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5555/api/users/getme',
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (response.status === 200) {
            setUserData(response.data);
          }
        } catch (error) {
          console.error('Error creating order:', error);
          throw new Error('Failed to create the order. Please try again.');
        }
      };
      getme();
    }
  }, [user]);
  const filteredValues = cartItems.map(({ _id, quantity, price }) => ({
    product: _id,
    quantity,
    price,
  }));
  const newOrder = {
    user: userData._id,
    orders: filteredValues,
    totalAmount: totalAmount,
    address: userData.address,
  };
  const createOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5555/api/orders/place_order',
        { newOrder },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      if (response.data.orderCreated) {
        setOrderCompleted(true);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create the order. Please try again.');
    }
  };

  return (
    <div className="orders_page">
      <h2 className="orders_header">Orders</h2>
      <OrderSummary />
      <button className='place_order_btn' onClick={createOrder}>CREATE ORDER</button>
      {orderCompleted && 'DOMISHAISFHSU'}
    </div>
  );
};

export default OrdersPage;
