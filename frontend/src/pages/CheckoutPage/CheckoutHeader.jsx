/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

const CheckoutHeader = ({ user, handleOpenUserOptions }) => {
  return (
    <div className="checkout_header">
      <div className="checkout">CHECKOUT</div>
      {user ? (
        <p className="customer_info">
          Signed in as: <span>{user.username}</span>
        </p>
      ) : (
        <span>
          <Link
            to="/auth"
            onClick={handleOpenUserOptions}
             className="not_logged_in"
          >
            Please Sign In or Register
          </Link>
        </span>
      )}
    </div>
  );
};

export default CheckoutHeader;
