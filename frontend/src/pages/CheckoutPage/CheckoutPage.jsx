import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './CheckoutPage.css';
import CartItems from '../../components/Header/Cart/CartItems';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import ShippingForm from '../../components/Forms/ShippingForm';
import { Link } from 'react-router-dom';
import PaymentForm from '../../components/Forms/PaymentForm';
import OrderSummary from '../../components/OrderSummary';
import { AuthContext } from '../../contexts/AuthContext';

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, handleOpenUserOptions } = useContext(CartContext);
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [shippingAddressData, setShippingAddressData] = useState(null);
  console.log(shippingAddressData);
  useEffect(() => {
    if (user) {
      const address = user.shippingAddress;
      setShippingAddressData(address);
    } else {
      setShippingAddressData(null);
    }
  }, [user]);
  const handleShippingForm = () => {
    setShowOrderSummary(false);
    setShowShippingForm(true);
  };
  const handlePaymentForm = () => {
    setShowOrderSummary(false);
    setShowShippingForm(false);
    setShowPaymentForm(true);
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
          {showOrderSummary && <OrderSummary />}
          {showShippingForm && <ShippingForm />}
          {showPaymentForm && <PaymentForm />}

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
                onClick={
                  shippingAddressData ? handlePaymentForm : handleShippingForm
                }
                className="checkout_shipping_btn"
              >
                {!shippingAddressData ? 'Shipping' : 'Payment'}
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
