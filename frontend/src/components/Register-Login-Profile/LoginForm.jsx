/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import closeIcon from '../../assets/close_btn.svg';

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
        <div onClick={handleClose} className="close_popup_icon">
          <img src={closeIcon} alt="close login form" />
        </div>

        <form className="login_form" onSubmit={handleSubmit}>
          <h2 className="login_txt">Login in to your account</h2>
          <div className="login_form_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              style={error ? { border: '1px solid red' } : null}
              required
              autoComplete="false"
            />
          </div>
          <div className="login_form_group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              style={error ? { border: '1px solid red' } : null}
              required
              autoComplete="false"
            />
          </div>

          <button disabled={isLoading}type="submit" className="login_form_btn">Sign In</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
