/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ handleClose, handleLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  //   console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        console.log("Please fill in all fields");
        return;
      }
    try {
      const { data } = await axios.post('http://localhost:5555/users/login', {
        email,
        password,
      });
      console.log('Login successful:', data);
      handleLogin(data);
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
        <form className="login_form" onSubmit={handleSubmit}>
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

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
