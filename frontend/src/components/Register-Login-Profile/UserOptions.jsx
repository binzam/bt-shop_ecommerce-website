/* eslint-disable react/prop-types */
import { useAuthContext } from '../../hooks/useAuthContext';
import UserProfile from './UserProfile';
import './UserOptions.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useState } from 'react';

const UserOptions = ({ handleClose }) => {
  const { user } = useAuthContext();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleCloseModals = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
  };
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
            <button onClick={handleClose} className="stay_out_btn">
              Stay signed out
            </button>
          </div>
        )}
        {user && <UserProfile handleClose={handleClose} />}
        {showRegisterModal && !user && (
          <RegisterForm handleClose={handleCloseModals} />
        )}
        {showLoginModal && !user && (
          <LoginForm handleClose={handleCloseModals} />
        )}
      </div>
    </div>
  );
};

export default UserOptions;
