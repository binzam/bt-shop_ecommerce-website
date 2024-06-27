/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const RegisterForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const { signup, error, isLoading } = useSignup();

  //   console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await signup(email, password, firstName, lastName);
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
          <br />

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

          <button disabled={isLoading}>Register</button>
          {error && <div className='error'>{error}</div> }
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
