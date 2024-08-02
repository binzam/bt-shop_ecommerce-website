import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="checkout_success_page">
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your business! If you have any questions, please contact
        us at <Link>bt-shop@support.com</Link>
      </p>
      <br />

      <Link to="/orders" className="view_orders_link">
        View Orders
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
