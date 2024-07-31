import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="checkout_success_page">
      <small>Order Submitted</small>
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your business! If you have any questions, please contact
        us at...
      </p>
      <br />
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

export default CheckoutSuccess;
