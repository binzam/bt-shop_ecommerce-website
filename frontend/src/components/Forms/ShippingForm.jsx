import './Forms.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const ShippingForm = () => {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    username: '',
    street: '',
    city: '',
    country: '',
  });
  useEffect(() => {
    if (user) {
      setShippingAddress((prevShippingAddress) => ({
        ...prevShippingAddress,
        username: user.username,
      }));
    }
  }, [user]);
  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };
  const { username, street, city, country } = shippingAddress;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        'http://localhost:5555/api/users/update_user',
        shippingAddress,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setError(null);
        dispatch({ type: 'UPDATE_SHIPPING_ADDRESS', payload: response.data.address });
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
    <form onSubmit={handleSubmit} className="shipping_form">
      <div className="shipping_header">Shipping Address</div>
      <div className="shipping_form_group">
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter your name"
          autoComplete="true"
          readOnly
        />
      </div>
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
      <button disabled={isLoading} type="submit" className="shipping_form_btn">
        Submit
      </button>
      {error && <div className="form_error">{error}</div>}
    </form>
  );
};

export default ShippingForm;
