/* eslint-disable react/prop-types */
import UserIcon from '../../../../assets/avatar.svg';
import CalendarIcon from '../../../../assets/calendar-regular.svg';
import LocationIcon from '../../../../assets/location-dot-solid.svg';
import TruckIcon from '../../../../assets/truck-solid.svg';

const OrderItem = ({ order, handleRemoveOrder }) => {
  return (
    <div className="order">
      <div className="order_title">
        <div>
          <img src={CalendarIcon} alt="calendar" />
        </div>
        <div>
          <p>{new Date(order.createdAt).toUTCString()}</p>
          <small>
            #ID <span className="highlight"> {order._id}</span>
          </small>
        </div>
      </div>
      <div className="order_header">
        <div className="order_customer">
          <div className="order_icon_wrapper">
            <img src={UserIcon} alt="user" />
          </div>
          <div className="order_customer_info">
            <p className="bold">Customer</p>
            <p>{order.user?.username || 'User Not Active'}</p>
            <p>{order.user?.email || '---'}</p>
            <p>{order.user?.address.phoneNumber || '---'}</p>
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
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>
            <p>Street: {order.shippingAddress.street}</p>
          </div>
        </div>
      </div>
      <table className="order_table">
        <thead>
          <tr>
            <th className="wider">Product</th>
            <th className="narrow">Quantity</th>
            <th className="mid">
              Price
              <small>
                <i>(per)</i>
              </small>
            </th>
            <th className="mid">
              Price
              <small>
                <i>(before TAX)</i>
              </small>
            </th>
            <th className="mid">
              <small>
                <i>(Item)</i>
              </small>
              TAX
            </th>
            <th className="wide">
              <small>
                <i>(Item)</i>
              </small>
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item) => (
            <tr className="ordered_product" key={item._id}>
              <td className="wider">
                <div className="order_table_prd_data">
                  <div className="order_prd_img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <span className="order_table_prd_title">{item.title}</span>{' '}
                </div>
              </td>
              <td className="narrow">{item.quantity}</td>
              <td className="mid">${item.price}</td>
              <td className="mid">${item.itemPrice}</td>
              <td className="mid">${item.tax}</td>
              <td className="wide">${item.totalItemPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order_table_total">
        {' '}
        <span className="total_amount">
          Total:<span className="dollar_sign">$</span>
          {order.totalAmount}
        </span>{' '}
      </div>
      <button
        className="remove_order_btn"
        onClick={() => handleRemoveOrder(order._id)}
      >
        Remove Order
      </button>
    </div>
  );
};

export default OrderItem;
