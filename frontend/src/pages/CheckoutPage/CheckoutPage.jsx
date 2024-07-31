import { useContext, useState } from 'react';
import { NavContext } from '../../contexts/NavContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './CheckoutPage.css';
import CartItems from '../../components/Header/Cart/CartItems';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import ShippingForm from '../../components/Forms/ShippingForm';
import OrderSummary from '../../components/OrderSummary';
import Loading from '../../components/Loading';
import { createOrder } from '../../utils/orderUtils';
import ArrowLeft from '../../assets/arrow-left.svg';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { cartItems, handleOpenUserOptions, handleClearCart } =
    useContext(NavContext);
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isReadyToPlaceOrder, setIsReadyToPlaceOrder] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const navigate = useNavigate();
  const filteredValues = cartItems.map(
    ({ _id, quantity, price, taxRate, title, image }) => ({
      product: _id,
      quantity,
      price,
      taxRate,
      title,
      image,
    })
  );
  const newOrder = {
    orderItems: filteredValues,
  };
  const handleDisplayShippingForm = () => {
    if (!user.hasAddress) {
      setShowShippingForm(true);
      setShowOrderSummary(false);
      setShowNextBtn(false);
    } else {
      checkIsReadyToPlaceOrder();
    }
  };
  const checkIsReadyToPlaceOrder = () => {
    if (user.hasAddress && cartItems.length > 0) {
      setShowNextBtn(false);
      setShowShippingForm(false);
      setShowOrderSummary(true);
      setIsReadyToPlaceOrder(true);
    } else {
      navigate('/checkout');
    }
  };
  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      await createOrder(
        setError,
        setIsLoading,
        user,
        newOrder,
        setIsOrderPlaced,
        handleClearCart
      );
      if (isOrderPlaced) {
        navigate('/orders');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      setError(
        'An error occurred while canceling the order. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const makePayment = async () => {
    handlePlaceOrder();
    await loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);

    try {
      const response = await axios.post(
        'http://localhost:5555/api/users/create_checkout_session',
        { cartItems },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      // window.location.href = response.data.sessionUrl;
      window.open(response.data.sessionUrl, '_blank');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="checkout_page">
      <div className="checkout_header">CHECKOUT</div>
      {error && <div className="form_error">{error}</div>}
      {isLoading && <Loading />}

      {!isOrderPlaced && (
        <div className="orders_content">
          <div className="checkout_orders">
            <span className="pending_orders_count">
              Pending Orders [<span>{cartItems.length}</span>]
            </span>
            {cartItems.length > 0 ? (
              <div className="pending_orders">
                <CartItems />
              </div>
            ) : (
              <>
                <div className="no_orders">
                  <p className="no_orders_txt">You have no Pending orders</p>
                  <Link className="shop_link" to="/products">
                    <img src={ArrowLeft} alt="Shop link" />
                    Back to Shop
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="checkout_progress_wrapper">
            {showOrderSummary && <OrderSummary />}
            {showShippingForm && cartItems.length > 0 && (
              <ShippingForm
                checkIsReadyToPlaceOrder={checkIsReadyToPlaceOrder}
              />
            )}
            <div className="checkout_option_btns">
              {!user && cartItems.length > 0 && (
                <Link
                  to="/auth"
                  onClick={handleOpenUserOptions}
                  className="checkout_login_btn"
                >
                  Login to Continue
                </Link>
              )}
              {user && showNextBtn && (
                <button
                  onClick={handleDisplayShippingForm}
                  className="checkout_next_btn"
                >
                  Next <img src={ArrowRight} alt="Next" />
                </button>
              )}
            </div>
            {isReadyToPlaceOrder && (
              <>
                <button className="place_order_btn" onClick={handlePlaceOrder}>
                  ORDER NOW
                </button>
              </>
            )}
            <button
              onClick={makePayment}
              className="checkout_login_btn payment_btn"
            >
              Make payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CheckoutPage;
