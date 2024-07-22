import { Link } from 'react-router-dom';

const OrderComplete = () => {
  return (
    <div className="order_complete_div">
      <h2>Order Submitted</h2>
      <h3>
        Status: <small>Pending</small>
      </h3>
      <p>
        Your Order has been Placed and it is Pending, Thank you for shopping
        with us.
      </p>
      <Link to="/orders" className="view_orders_link">
        View Orders
      </Link>
    </div>
  );
};

export default OrderComplete;
