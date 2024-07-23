import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import './OrdersPage.css';
import Loading from '../../components/Loading';
import { cancelUserOrder, fetchUserOrders } from '../../utils/orderUtils';
import OrderItem from '../AdminDashboard/adminComponents/OrderListing/OrderItem';
import ConfirmationPopup from '../AdminDashboard/adminComponents/ConfirmationPopup';
import { Link } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow-left.svg';

const OrdersPage = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isOrderCanceled, setisOrderCanceled] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserOrders(user, setOrders, setError, setIsLoading);
    }
  }, [user]);
  const handleCancelOrder = (orderId) => {
    setOrderId(orderId);
    setShowConfirmationPopup(true);
  };

  const cancelOrder = async () => {
    try {
      setIsLoading(true);
      await cancelUserOrder(user, orderId, setError, setisOrderCanceled);
      setShowConfirmationPopup(false);
      fetchUserOrders(user, setOrders, setError, setIsLoading);
    } catch (err) {
      console.error('Error canceling order:', err);
      setError(
        'An error occurred while canceling the order. Please try again.'
      );
    }
  };
  return (
    <div className="orders_page">
      {isLoading && <Loading />}
      <div className="orders_header">
        <h1>Your Orders</h1>
      </div>
      <div className="orders_view">
        {error && <div className="form_error">{error}</div>}
        {orders.length === 0 ? (
          <div className="no_orders">
            <p className="no_orders_txt">
              You haven&apos;t placed any orders yet.
            </p>
            <Link className="shop_link" to="/products">
              <img src={ArrowLeft} alt="Shop link" />
              Back to Shop
            </Link>
          </div>
        ) : (
          <>
            {isOrderCanceled && (
              <div className="order_canceled">Order Canceled</div>
            )}
            {orders.map((order) => (
              <OrderItem
                key={order._id}
                order={order}
                handleRemoveOrder={handleCancelOrder}
              />
            ))}
          </>
        )}
      </div>
      {showConfirmationPopup && (
        <ConfirmationPopup
          type="order"
          id={orderId}
          remove={cancelOrder}
          close={setShowConfirmationPopup}
        />
      )}
    </div>
  );
};

export default OrdersPage;
