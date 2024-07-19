import { useContext, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import closeIcon from '../../assets/close_btn.svg';
import './Forms.css';
import Loading from '../Loading';
import { NavContext } from '../../contexts/NavContext';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { handleOpenPassResetModal, handleCloseForms } = useContext(NavContext);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginForm;
  const { login, error, isLoading } = useLogin();
  //   console.log(loginForm);
  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    await login(email, password);
  };

  return (
    <>
      <Link
        to="/auth"
        onClick={handleCloseForms}
        className="close_popup_icon"
      >
        <img src={closeIcon} alt="close login form" />
      </Link>
      {isLoading && <Loading />}

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
            required
            autoComplete="false"
            placeholder="example@example.com"
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
            required
            autoComplete="false"
            placeholder="**********"
          />
        </div>

        <button disabled={isLoading} type="submit" className="login_form_btn">
          Sign In
        </button>
        {error && <div className="form_error">{error}</div>}
        <Link
          onClick={handleOpenPassResetModal}
          to="/auth/forgot_password"
          type="button"
          className="forgot_password_btn"
        >
          Forgot Password?
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
