/* eslint-disable react/prop-types */
import { useContext } from 'react';
import UserIcon from '../../assets/avatar.svg';
import CalendarIcon from '../../assets/calendar-regular.svg';
import LocationIcon from '../../assets/location-dot-solid.svg';
import TruckIcon from '../../assets/truck-solid.svg';
import './OrderCard.css';
import { AuthContext } from '../../contexts/AuthContext';
const OrderCard = ({ order, handleRemoveOrder, user }) => {
  const { isAdmin } = useContext(AuthContext);
  const {
    orderStatus,
    createdAt,
    shippingCompany,
    shippingAddress,
    payment,
    _id,
    totalAmount,
    orderItems,
  } = order;
  const { profilePicture, email, username } = user;
  return (
    <div className={`order ${orderStatus === 'Cancelled' ? 'cancelled' : ''}`}>
      <div className="order_title">
        <div>
          <img src={CalendarIcon} alt="calendar" />
        </div>
        <div>
          <p>{new Date(createdAt).toUTCString()}</p>
          <small>
            #ID <span className="highlight"> {_id}</span>
          </small>
        </div>
        {orderStatus === 'Cancelled' && (
          <div className="order_cancelled_txt">Order Cancelled</div>
        )}
      </div>
      <div className="order_header">
        <div className="order_customer">
          <div className="order_user_icon">
            <img src={profilePicture || UserIcon} alt="user" />
          </div>
          <div className="order_customer_info">
            <p className="bold">Customer</p>
            <p className="highlight">{username || 'User Not Active'}</p>
            <p>{email || '---'}</p>
            <p>{shippingAddress.phoneNumber || '---'}</p>
          </div>
        </div>

        <div className="order_address">
          <div className="order_icon_wrapper">
            <img src={TruckIcon} alt="truck" />
          </div>
          <div className="order_shipping_info">
            <p className="bold">Shipping</p>
            <p>
              Shipping: <strong>{shippingCompany}</strong>
            </p>
            <p>
              Payment method: <strong>{payment.paymentMethod}</strong>
            </p>
            <p>
              Payment Status:{' '}
              <strong
                className={`${payment.paymentStatus === 'paid' ? 'green' : ''}`}
              >
                {payment.paymentStatus}
              </strong>
            </p>
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
              <strong> {shippingAddress.city}</strong> ,
              <strong>{shippingAddress.country}</strong>
            </p>
            <p>
              Street: <strong>{shippingAddress.street}</strong>
            </p>
          </div>
        </div>
      </div>
      <table className="order_table">
        <thead className="table_head">
          <tr className="order_table_header">
            <th className="prd_column_head">Product</th>
            <th className="quantity_column">Quantity</th>
            <th className="price_tax_column">
              Price
              <br />
              <small>
                <i>(per)</i>
              </small>
            </th>
            <th className="price_tax_column">
              Price
              <br />
              <small>
                <i>(before TAX)</i>
              </small>
            </th>
            <th className="price_tax_column">
              <small>
                <i>(Item)</i>
              </small>
              TAX
            </th>
            <th className="item_tax_column">
              <small>
                <i>(Item)</i>
              </small>
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr className="ordered_product_row" key={item._id}>
              <td className="prd_column_data">
                <div className="order_table_prd_data">
                  <div className="order_prd_img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <span className="order_table_prd_title">{item.title}</span>
                </div>
              </td>
              <td className="quantity_column">{item.quantity}</td>
              <td className="price_tax_column">${item.price}</td>
              <td className="price_tax_column">${item.itemPrice}</td>
              <td className="price_tax_column">${item.tax}</td>
              <td className="item_tax_column">
                ${item.totalItemPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order_table_total">
        {' '}
        <span className="total_amount">
          Total:<span className="dollar_sign">$</span>
          {totalAmount}
        </span>{' '}
      </div>
      <button
        className="remove_order_btn"
        onClick={() => handleRemoveOrder(_id)}
      >
        {!isAdmin() ? 'Cancel Order' : 'Remove Order'}
      </button>
    </div>
  );
};

export default OrderCard;
