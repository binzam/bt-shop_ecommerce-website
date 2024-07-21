/* eslint-disable react/prop-types */
import './Forms.css';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import Loading from '../Loading';

const ShippingForm = ({ handlePaymentForm }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    country: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const { phoneNumber, street, city, country } = address;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        'http://localhost:5555/api/users/update_user',
        { address },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setError(null);
        handlePaymentForm();
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="shipping_form">
      {isLoading && <Loading />}

      <div className="shipping_header">Shipping Address</div>
      <div className="shipping_form_group">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          value={street}
          placeholder="Enter your street"
          onChange={handleChange}
          autoComplete="false"
        />
      </div>
      <div className="shipping_form_group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          placeholder="Enter your city"
          onChange={handleChange}
          autoComplete="false"
        />
      </div>
      <div className="shipping_form_group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={country}
          placeholder="Enter your country"
          onChange={handleChange}
          autoComplete="false"
        />
      </div>
      <div className="shipping_form_group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          placeholder="Enter your Phone Number"
          onChange={handleChange}
          autoComplete="false"
        />
      </div>
      <button disabled={isLoading} type="submit" className="shipping_form_btn">
        Submit
      </button>
      {error && <div className="form_error">{error}</div>}
    </form>
  );
};

export default ShippingForm;
