/* eslint-disable react/prop-types */
import { useState } from 'react';
import './OrdersList.css';
import ConfirmationPopup from '../ConfirmationPopup';
import useOrders from '../../../../hooks/useOrders.jsx';
import Loading from '../../../../components/Loading';
import UserIcon from '../../../../assets/avatar.svg';
import CalendarIcon from '../../../../assets/calendar-regular.svg';
import LocationIcon from '../../../../assets/location-dot-solid.svg';
import TruckIcon from '../../../../assets/truck-solid.svg';

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
              <div className="order_title">
                <div>
                  <img src={CalendarIcon} alt="calendar" />
                </div>
                <div>
                  <p>{new Date(order.createdAt).toUTCString()}</p>
                  <small>#ID {order._id}</small>
                </div>
              </div>
              <div className="order_header">
                <div className="order_customer">
                  <div className="order_icon_wrapper">
                    <img src={UserIcon} alt="user" />
                  </div>
                  <div className="order_customer_info">
                    <p className="bold">Customer</p>
                    <p>{order.user.username}</p>
                    <p>{order.user.email}</p>
                    <p>{order.user.address.phoneNumber}</p>
                  </div>
                </div>
                <div className="order_address">
                  <div className="order_icon_wrapper">
                    <img src={TruckIcon} alt="truck" />
                  </div>
                  <div className="order_shipping_info">
                    <p className="bold">Shipping</p>
                    <p>Shipping: {order.shippingCompany}</p>
                    <p>Payment method: {order.paymentMethod}</p>
                    <p>Status: {order.paymentStatus}</p>
                  </div>
                </div>
                <div className="order_delivery">
                  <div className="order_icon_wrapper">
                    <img className="icon" src={LocationIcon} alt="address" />
                  </div>
                  <div className="order_delivery_info">
                    <p className="bold">Deliver to</p>
                    <p>
                      City:
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.country}
                    </p>
                    <p>Street: {order.shippingAddress.street}</p>
                  </div>
                </div>
              </div>
              {order.orders.map((item) => (
                <table key={item._id} className="order_table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>
                        Price<small>(per)</small>
                      </th>
                      <th>
                        Price<small>(before TAX)</small>
                      </th>
                      <th>
                        <small>(Item)</small>TAX
                      </th>
                      <th>
                        <small>(Item)</small>TOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                </table>
              ))}
              <div>ORDER TOTAL: ${order.totalAmount}</div>
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
