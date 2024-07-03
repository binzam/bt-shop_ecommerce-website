/* eslint-disable react/prop-types */
import UserProfile from './UserProfile';
import './UserOptions.css';
import RegisterForm from '../../Forms/RegisterForm';
import LoginForm from '../../Forms/LoginForm';
import { useContext } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { CartContext } from '../../../contexts/CartContext';

const UserOptions = () => {
  const { user } = useAuthContext();
  const {
    showLoginModal,
    showRegisterModal,
    handleOpenRegisterModal,
    handleOpenLoginModal,
    handleCloseForms,
    handleCloseModals,
  } = useContext(CartContext);

  return (
    <div className="modal">
      <div className="modal_content">
        {!user && !showRegisterModal && !showLoginModal && (
          <div className="login_signup_div">
            <div className="login_signup_btns">
              <button onClick={handleOpenLoginModal} className="login_btn">
                Log In
              </button>
              <button onClick={handleOpenRegisterModal} className="signup_btn">
                Sign Up
              </button>
            </div>
            <button onClick={handleCloseModals} className="stay_out_btn">
              Stay signed out
            </button>
          </div>
        )}
        {user && <UserProfile />}
        {showRegisterModal && !user && (
          <RegisterForm handleClose={handleCloseForms} />
        )}
        {showLoginModal && !user && (
          <LoginForm handleClose={handleCloseForms} />
        )}
      </div>
    </div>
  );
};

export default UserOptions;
