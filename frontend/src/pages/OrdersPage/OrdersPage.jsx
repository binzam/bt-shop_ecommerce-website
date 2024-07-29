import { useAuthContext } from '../../hooks/useAuthContext';
import { useCallback, useEffect, useState } from 'react';
import './OrdersPage.css';
import Loading from '../../components/Loading';
import { cancelUserOrder, fetchUserOrders } from '../../utils/orderUtils';
import ConfirmationPopup from '../AdminDashboard/adminComponents/ConfirmationPopup';
import { Link } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow-left.svg';
import CheckmarkIcon from '../../assets/check-solid.svg';
import OrderCard from '../../components/OrderCard/OrderCard';

const OrdersPage = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isOrderCanceled, setIsOrderCanceled] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const fetchOrders = useCallback(() => {
    if (user) {
      setIsLoading(true);
      fetchUserOrders(user, setOrders, setError, setIsLoading);
    }
  }, [user]);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const handleCancelOrder = (orderId) => {
    setOrderId(orderId);
    setShowConfirmationPopup(true);
  };

  const cancelOrder = async () => {
    try {
      setIsLoading(true);
      await cancelUserOrder(user, orderId, setError, setIsOrderCanceled);
      setShowConfirmationPopup(false);
      fetchOrders();
    } catch (err) {
      console.error('Error canceling order:', err);
      setError(
        'An error occurred while canceling the order. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isOrderCanceled) {
      const timer = setTimeout(() => {
        setIsOrderCanceled(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOrderCanceled]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="orders_page">
      <div className="orders_header">
        <h2>Your Orders</h2>
      </div>
        {error && <div className="form_error">{error}</div>}
        {orders.length === 0 && (
          <div className="no_orders">
            <p className="no_orders_txt">
              You haven&apos;t placed any orders yet.
            </p>
            <Link className="shop_link" to="/products">
              <img src={ArrowLeft} alt="Shop link" />
              Back to Shop
            </Link>
          </div>
        )}
        {isOrderCanceled && (
          <div className="order_canceled">
            <span className="order_canceled_txt">Order canceled.</span>
            <span className="order_canceled_img">
              <img src={CheckmarkIcon} alt="" />
            </span>
          </div>
        )}
      <div className="orders_view">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            handleRemoveOrder={handleCancelOrder}
          />
        ))}
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
