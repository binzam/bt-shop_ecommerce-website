import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';
import { Link } from 'react-router-dom';

const LoginSignupButtons = () => {
  const { handleOpenRegisterForm, handleOpenLoginForm, handleCloseModal } =
    useContext(NavContext);
  return (
    <div className="login_signup_div">
      <div className="login_signup_btns">
        <Link to='login' onClick={handleOpenLoginForm} className="login_btn">
          Log In
        </Link>
        <Link to='register' onClick={handleOpenRegisterForm} className="signup_btn">
          Sign Up
        </Link>
      </div>
      <Link to='/home' onClick={handleCloseModal} className="stay_out_btn">
        Stay signed out
      </Link>
    </div>
  );
};

export default LoginSignupButtons;
