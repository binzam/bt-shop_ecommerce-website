/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Forms.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const PaymentForm = ({ handleCreateOrder }) => {
  const { user } = useAuthContext();
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setCreditCardInfo({ ...creditCardInfo, [e.target.name]: e.target.value });
  };
  const { cardNumber, cardName, expiryDate, cvv } = creditCardInfo;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        'http://localhost:5555/api/users/update_payment',
        { creditCardInfo },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setError(null);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        handleCreateOrder();
      } else {
        setIsLoading(false);
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="payment_form" onSubmit={handleSubmit}>
      <h2 className="payment_header">Credit card Information</h2>
      <div className="payment_form_group">
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={handleChange}
        />
      </div>
      <div className="payment_form_group">
        <label htmlFor="cardName">Cardholder Name:</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={cardName}
          onChange={handleChange}
        />
      </div>
      <div className="payment_form_group">
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          name="expiryDate"
          id="expiryDate"
          value={expiryDate}
          onChange={handleChange}
        />
      </div>
      <div className="payment_form_group">
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={cvv}
          onChange={handleChange}
        />
      </div>
      <button disabled={isLoading} className="payment_form_btn" type="submit">
        Place Order
      </button>
      {error && <div className="form_error">{error}</div>}
    </form>
  );
};

export default PaymentForm;
