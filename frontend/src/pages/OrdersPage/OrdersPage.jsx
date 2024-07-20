import { useAuthContext } from '../../hooks/useAuthContext';
import { useContext, useEffect, useState } from 'react';
import { NavContext } from '../../contexts/NavContext';
import axios from 'axios';
import './OrdersPage.css';
import OrderSummary from '../../components/OrderSummary';
import getme from '../../utils/getUserData';
import Loading from '../../components/Loading';

const OrdersPage = () => {
  const { user } = useAuthContext();
  const { cartItems, handleClearCart } = useContext(NavContext);
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const handlePlaceOrder = () => {
    setOrderCompleted(true);
    handleClearCart();
  };
  useEffect(() => {
    if (user) {
      getme(user, setUserData, setError);
    }
  }, [user]);
  console.log(userData);
  console.log(orderData);

  const filteredValues = cartItems.map(({ _id, quantity, price, taxRate }) => ({
    product: _id,
    quantity,
    price,
    taxRate,
  }));
  const orderObj = {
    user: userData._id,
    orderItems: filteredValues,
    shippingAddress: userData.address,
  };
  const createOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5555/api/orders/place_order',
        { orderObj },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data.orderCreated) {
        setError(null);
        setOrderData([...orderData, response.data.order]);
        handlePlaceOrder();
      }
    } catch (error) {
      console.log(error);
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
          <ul>
            {orderData && orderData.map((order) => (
              <li key={order._id}>
                <div>
                  <div>{order.user}</div>
                  <div>Total: {order.totalAmount}</div>
                </div>
                {order.orderItems.map((item) => (
                  <div key={item._id}>
                    <div>{item.title}</div>
                    <div>{item.quantity}</div>
                    <div>{item.price}</div>
                    <div>{item.itemPrice}</div>
                    <div>{item.tax}</div>
                    <div>{item.totalItemPrice}</div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
