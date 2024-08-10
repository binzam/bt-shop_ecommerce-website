import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import CheckMarkIcon from '../../../assets/check-solid.svg';
import { ShopContext } from '../../../contexts/ShopContext';
import './CheckoutSuccess.css';
import axiosInstance from '../../../utils/axiosInstance';
const CheckoutSuccess = () => {
  const { user } = useAuthContext();
  const { handleClearCart } = useContext(ShopContext);

  const [sessionId, setSessionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [prevSessionId, setPrevSessionId] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get('session_id');
    setSessionId(session_id);
  }, []);

  useEffect(() => {
    if (sessionId && sessionId !== prevSessionId) {
      const verifyPayment = async () => {
        try {
          const response = await axiosInstance.post('/payment/verify_payment', {
            sessionId,
          });
          console.log(response);

          setPaymentStatus(response.data.status);
          if (response.data.status === 'paid') {
            handleClearCart();
          }
          setPrevSessionId(sessionId);
        } catch (error) {
          console.error('Error verifying payment:', error);
          setPaymentStatus('failed');
        }
      };

      verifyPayment();
    }
  }, [sessionId, user, handleClearCart, prevSessionId]);

  return (
    <div className="checkout_success_page">
      {paymentStatus === 'paid' && (
        <div className="payment_verifyed">
          <h1>Payment Successful!</h1>
          <div className="paid_icon">
            <img src={CheckMarkIcon} alt="" />
          </div>
        </div>
      )}

      <div className="order_submitted_msg">
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
    </div>
  );
};

export default CheckoutSuccess;
