import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import UserProfile from '../UserProfile/UserProfile';
import LoginSignupButtons from '../LoginSignupButtons';
import './Modal.css';
import LoginForm from '../../Forms/LoginForm';
import RegisterForm from '../../Forms/RegisterForm';
import { ShopContext } from '../../../contexts/ShopContext';
import ForgotPasswordForm from '../../Forms/ForgotPasswordForm';
import PasswordResetForm from '../../Forms/PasswordResetForm';
const Modal = () => {
  const { user } = useContext(AuthContext);
  const {
    showLoginForm,
    showRegisterForm,
    showPasswordResetModal,
    showResetPasswordForm,
  } = useContext(ShopContext);

  return (
    <div className="modal">
      <div className="modal_content">
        {user ? (
          <UserProfile />
        ) : (
          <>
            {showLoginForm ? (
              <LoginForm />
            ) : showRegisterForm ? (
              <RegisterForm />
            ) : showPasswordResetModal ? (
              <ForgotPasswordForm />
            ) : showResetPasswordForm ? (
              <PasswordResetForm />
            ) : (
              <LoginSignupButtons />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
