/* eslint-disable react/prop-types */
import { useState } from 'react';
import './OrdersList.css';
import ConfirmationPopup from '../ConfirmationPopup';
import useOrders from '../../../../hooks/useOrders.jsx';
import Loading from '../../../../components/Loading';

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
        <div className="orders_list">
          {orders.map((order) => (
            <div className="order" key={order._id}>
              <div className="order_header">
                <div className="order_title">
                  <h3>Order ID: {order._id}</h3>
                  <p>
                    Order Created At:{' '}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="order_customer_info">
                  <p>{order.user.username}</p>
                  <p>{order.user.email}</p>
                  <p>{order.user.phoneNumber}</p>
                </div>
              </div>
              <table className="order_table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>
                      <small>(Item)</small>Price
                    </th>
                    <th>
                      <small>(Item)</small>Total Price
                    </th>
                    <th>
                      <small>(Item)</small>TAX
                    </th>
                    <th>
                      <small>(Item)</small>TOTAL
                    </th>
                  </tr>
                </thead>
                {order.orders.map((item) => (
                  <tbody key={item._id}>
                    <tr>
                      <td>
                        <div>
                          {item.product.title}{' '}
                          <div>
                            <img
                              width="100"
                              height={50}
                              src={item.product.image}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>${item.product.price}</td>
                      <td>${item.itemPrice}</td>
                      <td>${item.tax.toFixed(2)}</td>
                      <td>${item.totalItemPrice.toFixed(2)}</td>
                    </tr>
                    <tr>ORDER TOTAL: {item.totalAmount}</tr>
                  </tbody>
                ))}
              </table>
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
