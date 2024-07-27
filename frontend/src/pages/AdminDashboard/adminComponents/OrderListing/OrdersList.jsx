import { useState } from 'react';
import './OrdersList.css';
import ConfirmationPopup from '../ConfirmationPopup';
import useOrders from '../../../../hooks/useOrders.jsx';
import Loading from '../../../../components/Loading';
import OrderItem from '../../../../components/OrderItem/OrderItem.jsx';

const OrdersList = () => {
  const { orders, ordersError, loading, removeOrder } = useOrders();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleRemoveOrder = (orderId) => {
    setOrderId(orderId);
    setShowConfirmationPopup(true);
  };

  // console.log(orders);
  return (
    <div className="orders">
      {loading && <Loading />}
      {ordersError && <div className="form_error">{ordersError}</div>}
      {orders.length < 1 ? (
        <div className="no_orders">You have No orders.</div>
      ) : (
        <>
          <div className="counter">Pending Orders : {orders.length}</div>
          <div className="orders_list">
            {orders.map((order) => (
              <OrderItem
                key={order._id}
                handleRemoveOrder={handleRemoveOrder}
                order={order}
              />
            ))}
          </div>
        </>
      )}

      {showConfirmationPopup && (
        <ConfirmationPopup
          type="Order"
          id={orderId}
          remove={removeOrder}
          close={setShowConfirmationPopup}
        />
      )}
    </div>
  );
};

export default OrdersList;
