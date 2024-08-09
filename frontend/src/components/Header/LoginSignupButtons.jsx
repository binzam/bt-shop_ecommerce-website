import { useContext } from 'react';
import { ShopContext } from '../../contexts/ShopContext';

const LoginSignupButtons = () => {
  const { handleOpenRegisterForm, handleOpenLoginForm, handleCloseModal } =
    useContext(ShopContext);
  return (
    <div className="login_signup_div">
      <div className="login_signup_btns">
        <button onClick={handleOpenLoginForm} className="login_btn">
          Log In
        </button>
        <button onClick={handleOpenRegisterForm} className="signup_btn">
          Sign Up
        </button>
      </div>
      <button onClick={handleCloseModal} className="stay_out_btn">
        Stay signed out
      </button>
    </div>
  );
};

export default LoginSignupButtons;
