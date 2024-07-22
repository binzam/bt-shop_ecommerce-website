import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import './OrdersPage.css';
import Loading from '../../components/Loading';
import { fetchUserOrders } from '../../utils/orderUtils';
import OrderItem from '../AdminDashboard/adminComponents/OrderListing/OrderItem';

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
  // console.log('Orders in orderspage', orders);
  return (
    <div className="orders_page">
      {error && <div className="form_error">{error}</div>}
      {isLoading && <Loading />}

      <div className="orders_view">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>You haven&apos;t placed any orders yet.</p>
        ) : (
          <div>
            {orders.map((order) => (
              <OrderItem
                key={order._id}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
