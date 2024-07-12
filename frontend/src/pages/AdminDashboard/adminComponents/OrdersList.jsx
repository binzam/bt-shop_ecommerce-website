/* eslint-disable react/prop-types */
import { useState } from 'react';
import './users-orders.css';
import ConfirmationPopup from './ConfirmationPopup';
import useOrders from '../../../hooks/useOrders';
import Loading from '../../../components/Loading';

const OrdersList = ({ user, updateOrders }) => {
  const { orders, error, loading, removeOrder } = useOrders(user);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleRemoveOrder = (orderId) => {
    setOrderId(orderId);
    setShowConfirmationPopup(true);
  };
  return (
    <div className="orders">
      {loading && <Loading />}
      {error && <div className="form_error">{error}</div>}
      {orders.length < 1 ? (
        <div className="no_orders">You have No orders.</div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>User: {order.user.username}</p>
              <p>User email: {order.user.email}</p>
              <p>Phone number: {order.user.phoneNumber}</p>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orders.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.product.title}{' '}
                        <img width="100" src={item.product.image} alt="" />
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.shippingAddress.city}</td>
                      <td>{order.shippingAddress.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(order.updatedAt).toLocaleString()}</p>
              <button
                className="remove_order_btn"
                onClick={() => handleRemoveOrder(order._id)}
              >
                Remove Order
              </button>
            </div>
          ))}
        </div>
      )}

      {showConfirmationPopup && (
        <ConfirmationPopup
          type="Order"
          id={orderId}
          remove={removeOrder}
          close={setShowConfirmationPopup}
          updateOrders={updateOrders}
        />
      )}
    </div>
  );
};

export default OrdersList;
