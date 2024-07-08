import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './CheckoutPage.css';
import CartItems from '../../components/Header/Cart/CartItems';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import ShippingForm from '../../components/Forms/ShippingForm';
import { Link, useNavigate } from 'react-router-dom';
import PaymentForm from '../../components/Forms/PaymentForm';
import OrderSummary from '../../components/OrderSummary';
import { useAuthContext } from '../../hooks/useAuthContext';
import getme from '../../utils/getUserData';

const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { cartItems, handleOpenUserOptions } = useContext(CartContext);
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      getme(user, setUserData, setError);
    }
  }, [user]);
  const handleShippingForm = () => {
    const address = userData.address || null;
    if (!address) {
      setShowShippingForm(true);
      setShowOrderSummary(false);
      setShowPaymentForm(false);
    } else {
      handlePaymentForm();
    }
  };
  const handlePaymentForm = () => {
    const cardInfo = userData.creditCardInfo || null;
    if (!cardInfo) {
      setShowOrderSummary(false);
      setShowShippingForm(false);
      setShowPaymentForm(true);
    } else {
      handleCreateOrder();
    }
  };
  const handleCreateOrder = () => {
    setShowPaymentForm(false);
    setShowOrderSummary(false);
    navigate('/orders');
  };
  return (
    <div className="checkout_page">
      <div className="checkout_header">
        <div className="checkout">CHECKOUT</div>
        {error && <div className="form_error">{error}</div>}
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
          {showShippingForm && cartItems.length > 0 && (
            <ShippingForm handlePaymentForm={handlePaymentForm} />
          )}
          {showPaymentForm && (
            <PaymentForm handleCreateOrder={handleCreateOrder} />
          )}
          <div className="checkout_option_btns">
            {!user && cartItems.length > 0 && (
              <button
                onClick={handleOpenUserOptions}
                className="checkout_login_btn"
              >
                Login to Continue
              </button>
            )}
            {user && showOrderSummary && (
              <button
                onClick={handleShippingForm}
                className="checkout_next_btn"
              >
                Next <img src={ArrowRight} alt="shipping button" />
              </button>
            )}
          </div>
        </div>
        <Link className="shop_link" to="/products">
          <img src={ArrowLeft} alt="Shop link" />
          Back to Shop
        </Link>
      </div>
    </div>
  );
};
// jo9@gmail.com
// flkj9JSH0(|)
export default CheckoutPage;
