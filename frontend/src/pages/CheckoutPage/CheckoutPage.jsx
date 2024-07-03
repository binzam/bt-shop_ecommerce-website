import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './CheckoutPage.css';
import CartItems from '../../components/Header/Cart/CartItems';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import ShippingForm from '../../components/Forms/ShippingForm';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { cartItems, handleOpenUserOptions } = useContext(CartContext);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(true);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleShippingForm = () => {
    setShowOrderSummary(false);
    setShowShippingForm(true);
  };
  return (
    <div className="checkout_page">
      <div className="checkout_header">
        <div className="checkout">CHECKOUT</div>
        {user ? (
          <p className="customer_info">
            You are Logged in as: <span>{user.username}</span>
          </p>
        ) : (
          <span className="not_logged_in">You are Not Logged In.</span>
        )}
      </div>
      <div className="orders_content">
        <div className="orders">
          <span className="pending_orders_count">
            Pending Orders [<span>{cartItems.length}</span>]
          </span>
          {cartItems.length > 0 ? (
            <div className="pending_orders">
              <CartItems />
            </div>
          ) : (
            <p className="no_orders">You have no Pending orders</p>
          )}
        </div>
        <div className="checkout_progress_wrapper">
          {showOrderSummary && (
            <div className="order_summary">
              <div className="order_summary_header">Order Summary</div>
              <div className="pricing_summary">
                <div>
                  <p className="left">
                    Items ( <span>{cartItems.length}</span> ) :
                  </p>
                  <p className="right">${calculateTotal()}</p>
                </div>
                <div>
                  <p className="left">Shipping & Handling:</p>
                  <p className="right">$0.00</p>
                </div>
                <div>
                  <p className="left">Total Before TAX: </p>
                  <p className="right">${calculateTotal()}</p>
                </div>
                <div>
                  <p className="left">Estimated TAX to be collected: </p>
                  <p className="right">
                    ${(calculateTotal() * 0.15).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="left total">Order Total:</p>
                  <p className="right order_total">
                    {' '}
                    <span className="dollar_sign">$</span>
                    {calculateTotal()}
                  </p>
                </div>
              </div>
            </div>
          )}
          {showShippingForm && <ShippingForm />}
          <div className="checkout_option_btns">
            <Link className="shop_link" to="/products">
              <img src={ArrowLeft} alt="Shop link" />
              Back to Shop
            </Link>
            {!user && cartItems.length > 0 ? (
              <button
                onClick={handleOpenUserOptions}
                className="checkout_login_btn"
              >
                Login to Continue
              </button>
            ) : (
              <button
                onClick={handleShippingForm}
                className="checkout_shipping_btn"
              >
                Shipping
                <img src={ArrowRight} alt="shipping button" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// jo9@gmail.com
// flkj9JSH0(|)
export default CheckoutPage;
