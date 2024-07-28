import { useState } from 'react';
import './OrdersList.css';
import ConfirmationPopup from '../ConfirmationPopup';
import useOrders from '../../../../hooks/useOrders.jsx';
import Loading from '../../../../components/Loading';
import OrderCard from '../../../../components/OrderCard/OrderCard.jsx';

const OrdersList = () => {
  const { orders, ordersError, loading, removeOrder } = useOrders();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [sortType, setSortType] = useState('all');

  const handleSortOrders = (type) => {
    setSortType(type);
  };

  let filteredOrders =
    sortType === 'all'
      ? orders
      : orders.filter((order) => order.orderStatus === 'Cancelled');
  const handleRemoveOrder = (orderId) => {
    setOrderId(orderId);
    setShowConfirmationPopup(true);
  };
  return (
    <div className="orders">
      {loading && <Loading />}
      {ordersError && <div className="form_error">{ordersError}</div>}
      {orders.length < 1 ? (
        <div className="no_orders">You have No orders.</div>
      ) : (
        <>
          <div className="counter">Pending Orders : {orders.length}</div>
          <div className="sort_buttons">
            <button
              className={`all_orders_btn ${
                sortType === 'all' ? 'selected' : ''
              }`}
              onClick={() => handleSortOrders('all')}
            >
              All Orders
            </button>
            <button
              className={`cancelled_orders_btn ${
                sortType !== 'all' ? 'selected' : ''
              }`}
              onClick={() => handleSortOrders('canceled')}
            >
              Canceled Orders
            </button>
          </div>
          <div className="orders_list">
            {filteredOrders.map((order) => (
              <OrderCard
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
