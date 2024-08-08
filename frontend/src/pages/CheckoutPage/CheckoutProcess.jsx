/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useContext, useState } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import axios from 'axios';
import Loading from '../../components/Loading';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutProcess = ({
  isShippingAddressFilled,
  showShippingForm,
  handleDisplayShippingForm,
  shippingAddress,
}) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { cartItems, handleOpenUserOptions } = useContext(ShopContext);
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
  const makePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5555/api/payment/create_checkout_session',
        { orderedItems, shippingAddress },
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
      localStorage.setItem('orderId', JSON.stringify(response.data.orderId));

      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setError(error);
    }
  };
  return (
    <>
      {error && <div className="form_error">{error}</div>}
      {isLoading && <Loading />}
      {user && cartItems.length > 0 && (
        <>
          {!showShippingForm && !isShippingAddressFilled && (
            <button
              onClick={handleDisplayShippingForm}
              className="checkout_next_btn"
            >
              Next <img src={ArrowRight} alt="Next" />
            </button>
          )}

          {!showShippingForm && isShippingAddressFilled && (
            <button
              onClick={makePayment}
              className="checkout_login_btn"
            >
              Proceed to payment
            </button>
          )}
        </>
      )}

      {!user && cartItems.length > 0 && (
        <Link
          to="/auth"
          onClick={handleOpenUserOptions}
          className="checkout_login_btn"
        >
          Login to Continue
        </Link>
      )}
    </>
  );
};

export default CheckoutProcess;
