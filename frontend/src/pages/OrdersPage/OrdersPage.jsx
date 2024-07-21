import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import './OrdersPage.css';
import Loading from '../../components/Loading';
import { fetchUserOrders } from '../../utils/orderUtils';

const OrdersPage = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserOrders(user, setOrders, setError, setIsLoading);
    }
  }, [user]);
  console.log(orders);
  return (
    <div className="orders_page">
      {error && <div className="form_error">{error}</div>}
      {isLoading && <Loading />}

      <div className="orders_view">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>You haven&apos;t placed any orders yet.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <p>Order ID: {order._id}</p>
                {order.orderItems.map((item)=>(
                  <div key={item._id}>item{item._id}</div>
                ))}
                <p>Total Amount: {order.totalAmount}</p>
                <p>Payment Status: {order.paymentStatus}</p>
                <p>Order Status: {order.orderStatus}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
