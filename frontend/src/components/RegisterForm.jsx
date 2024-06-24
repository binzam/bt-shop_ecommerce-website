/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;
  //   console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post(
        'http://localhost:5555/users/register',
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      console.log('Registration successful:', data);
    localStorage.setItem("userInfo", JSON.stringify(data));
      handleClose()
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };
  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close_modal" onClick={handleClose}>
          close form
        </span>
        <form className="register_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <br />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <br />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
