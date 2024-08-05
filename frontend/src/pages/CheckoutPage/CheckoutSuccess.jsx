import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const CheckoutSuccess = () => {
  const { user } = useAuthContext();

  const [sessionId, setSessionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  useEffect(() => {
    const orderId = localStorage.getItem('orderId');
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get('session_id');
    setSessionId(session_id);

    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5555/api/payment/verify_payment',
          { sessionId, orderId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response);
        
        setPaymentStatus(response.data.status);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setPaymentStatus('failed');
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [user, sessionId]);

  return (
    <div className="checkout_success_page">
      {paymentStatus === 'paid' && (
        <div className="payment_verifyed">
          <h1>Payment Successful!</h1>
          <img src="" alt="" />
        </div>
      )}
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
  );
};

export default CheckoutSuccess;
