import { useAuthContext } from '../../hooks/useAuthContext';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import './OrdersPage.css';
import OrderSummary from '../../components/OrderSummary';
import getme from '../../utils/getUserData';
import Loading from '../../components/Loading';

const OrdersPage = () => {
  const TAX_RATE = 0.15;
  const { user } = useAuthContext();
  const { cartItems, handleClearCart } = useContext(CartContext);
  const [userData, setUserData] = useState([]);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const calculateTax = () => {
    const amount = calculateTotal();
    const tax = amount * TAX_RATE;
    return tax.toFixed(2);
  };

  const calculateOrderTotal = () => {
    const totalAmount = calculateTotal();
    const tax = calculateTax();
    return (totalAmount + parseFloat(tax)).toFixed(2);
  };
  const orderTotal = calculateOrderTotal();

  const handlePlaceOrder = () => {
    setOrderCompleted(true);
    handleClearCart();
  };
  useEffect(() => {
    if (user) {
      getme(user, setUserData, setError);
    }
  }, [user]);

  const filteredValues = cartItems.map(({ _id, quantity, price }) => ({
    product: _id,
    quantity,
    price,
  }));
  const order = {
    user: userData._id,
    orders: filteredValues,
    totalAmount: orderTotal,
    address: userData.address,
  };
  const createOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5555/api/orders/place_order',
        { order },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data.orderCreated) {
        setError(null);
        setLoading(false);
        handlePlaceOrder();
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders_page">
      <h2 className="orders_header">Orders</h2>
      {error && <div className="form_error">{error}</div>}
      {loading && <Loading />}
      {!orderCompleted && <OrderSummary />}

      {!orderCompleted && (
        <button className="place_order_btn" onClick={() => createOrder()}>
          CREATE ORDER
        </button>
      )}

      {orderCompleted && (
        <div className="order_complete_div">
          <h2>Order Submitted</h2>
          <p>
            Your Order has been Placed and it is Pending, Thank you for shopping
            with us.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
