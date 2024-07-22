/* eslint-disable react/prop-types */


const CheckoutHeader = ({ user }) => {
  return (
    <div className="checkout_header">
      <div className="checkout">CHECKOUT</div>
      {user ? (
        <p className="customer_info">
          Signed in as: <span>{user.username}</span>
        </p>
      ) : (
        <span className="not_logged_in">Please Sign In or Register</span>
      )}
      
    </div>
  );
};

export default CheckoutHeader;
