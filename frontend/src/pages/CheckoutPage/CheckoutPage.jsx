import { useContext, useState } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './CheckoutPage.css';
import CartItems from '../../components/Header/Cart/CartItems';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import ShippingForm from '../../components/Forms/ShippingForm';
import OrderSummary from '../../components/OrderSummary';
import Loading from '../../components/Loading';
// import { createOrder } from '../../utils/orderUtils';
import ArrowLeft from '../../assets/arrow-left.svg';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { cartItems, handleOpenUserOptions } = useContext(ShopContext);
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const [showPayBtn, setShowPayBtn] = useState(false);
  const navigate = useNavigate();
  const orderedItems = cartItems.map(
    ({ _id, quantity, price, taxRate, title, image }) => ({
      product: _id,
      quantity,
      price,
      taxRate,
      title,
      image,
    })
  );

  const handleDisplayShippingForm = () => {
    if (!user) {
      setShowLoginBtn(true);
      setShowNextBtn(false);
    } else if (user && !user.hasAddress && cartItems.length > 0) {
      setShowOrderSummary(false);
      setShowShippingForm(true);
      setShowNextBtn(false);
    } else {
      checkIsReadyToPlaceOrder();
    }
  };
  const checkIsReadyToPlaceOrder = () => {
    setShowShippingForm(false);
    setShowOrderSummary(true);
    setShowPayBtn(true);
    if (user.hasAddress && cartItems.length > 0) {
      setShowNextBtn(false);
    } else {
      navigate('/checkout');
    }
  };
  // const handlePlaceOrder = async () => {
  //   try {
  //     setIsLoading(true);
  //     await createOrder(
  //       setError,
  //       setIsLoading,
  //       user,
  //       newOrder,
  //       setIsOrderPlaced
  //     );
  //     setShowPayBtn(true);
  //   } catch (err) {
  //     console.error('Error creating order:', err);
  //     setError(
  //       'An error occurred while canceling the order. Please try again.'
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const makePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5555/api/payment/create_checkout_session',
        { orderedItems },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);
      const stripe = await stripePromise;
      const { id } = response.data.stripeSession;
      setIsLoading(true);

      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setError(error);
    }
  };
  return (
    <div className="checkout_page">
      <div className="checkout_header">CHECKOUT</div>
      {error && <div className="form_error">{error}</div>}
      {isLoading && <Loading />}

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
          {showShippingForm && (
            <ShippingForm checkIsReadyToPlaceOrder={checkIsReadyToPlaceOrder} />
          )}
          <div className="checkout_option_btns">
            {showLoginBtn && (
              <Link
                to="/auth"
                onClick={handleOpenUserOptions}
                className="checkout_login_btn"
              >
                Login to Continue
              </Link>
            )}
            {showNextBtn && (
              <button
                onClick={handleDisplayShippingForm}
                className="checkout_next_btn"
              >
                Next <img src={ArrowRight} alt="Next" />
              </button>
            )}
          </div>
          {showPayBtn && (
            <button
              onClick={makePayment}
              className="checkout_login_btn payment_btn"
            >
              Proceed to payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
