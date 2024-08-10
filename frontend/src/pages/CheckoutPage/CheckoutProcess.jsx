/* eslint-disable react/prop-types */
import { useAuthContext } from '../../hooks/useAuthContext';
import { useContext, useState } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import Loading from '../../components/Loading';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../utils/axiosInstance';

const CheckoutProcess = ({
  isShippingAddressFilled,
  showShippingForm,
  handleDisplayShippingForm,
  shippingAddress,
}) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { cartItems, handleOpenModal } = useContext(ShopContext);
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
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        '/payment/create_checkout_session',
        { orderedItems, shippingAddress },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { id } = response.data.stripeSession;
      const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);
      const stripe = await stripePromise;

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
          {isShippingAddressFilled && (
            <div className="shipping_address">
              <div className='shipping_address_header'>Shipping Address</div>
              <p>
                Street: <strong>{shippingAddress.street}</strong>{' '}
              </p>
              <p>
                City: <strong>{shippingAddress.city}</strong>{' '}
              </p>
              <p>
                Country: <strong>{shippingAddress.country}</strong>{' '}
              </p>
              <p>
                Phone: <strong>{shippingAddress.phoneNumber}</strong>{' '}
              </p>
            </div>
          )}

          {!showShippingForm && isShippingAddressFilled && (
            <button onClick={makePayment} className="payment_btn">
              Proceed to payment
            </button>
          )}
        </>
      )}

      {!user && cartItems.length > 0 && (
        <button
          onClick={handleOpenModal}
          className="checkout_login_btn"
        >
          Login to Continue
        </button>
      )}
    </>
  );
};

export default CheckoutProcess;
