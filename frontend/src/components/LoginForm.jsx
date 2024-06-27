/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const LoginForm = ({ handleClose }) => {
  const [LoginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = LoginForm;
  const { login, error, isLoading } = useLogin();
  //   console.log(LoginForm);
  const handleChange = (e) => {
    setLoginForm({ ...LoginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log('Please fill in all fields');
      return;
    }
    await login(email, password);
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
            autoComplete='false'
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete='false'
          />
          <br />

          <button disabled={isLoading}>Sign in</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
