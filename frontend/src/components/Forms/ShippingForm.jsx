/* eslint-disable react/prop-types */
import './Forms.css';
import { useState } from 'react';

const ShippingForm = ({ onShippingAddressUpdate }) => {
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    country: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const { phoneNumber, street, city, country } = shippingAddress;
  const handleSubmit = (e) => {
    e.preventDefault();
    onShippingAddressUpdate(shippingAddress);
  };
  return (
    <form onSubmit={handleSubmit} className="shipping_form">
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
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
        />
      </div>
      <button type="submit" className="shipping_form_btn">
        Save Shipping Address
      </button>
    </form>
  );
};

export default ShippingForm;
