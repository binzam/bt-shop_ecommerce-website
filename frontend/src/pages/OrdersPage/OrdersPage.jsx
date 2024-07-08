import { useAuthContext } from '../../hooks/useAuthContext';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import './OrdersPage.css';
import OrderSummary from '../../components/OrderSummary';
import getme from '../../utils/getUserData';

const OrdersPage = () => {
  const { user } = useAuthContext();
  const { cartItems, handleClearCart } = useContext(CartContext);
  const [userData, setUserData] = useState([]);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [placedOrder, setPlacedOrder] = useState([]);
  const [error, setError] = useState(null);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseInt(item.price) * parseInt(item.quantity);
    });
    return parseInt(total.toFixed(2), 10);
  };

  const calculateTax = () => {
    return Number(parseInt(calculateTotal() * 0.15, 10).toFixed(2));
  };

  const totalAmount = Number(calculateTax() + calculateTotal()).toFixed(2);
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
    totalAmount: totalAmount,
    address: userData.address,
  };
  const createOrder = async () => {
    try {
      setError(null);
      const response = await axios.post(
        'http://localhost:5555/api/orders/place_order',
        { order },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      if (response.data.orderCreated) {
        setError(null);
        handlePlaceOrder();
        setPlacedOrder(response.data.order);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  console.log(placedOrder);

  return (
    <div className="orders_page">
      <h2 className="orders_header">Orders</h2>
      {error && <div className="form_error">{error}</div>}
      {!orderCompleted && <OrderSummary />}

      {!orderCompleted && (
        <button className="place_order_btn" onClick={() => createOrder()}>
          CREATE ORDER
        </button>
      )}

      {orderCompleted &&  (
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
