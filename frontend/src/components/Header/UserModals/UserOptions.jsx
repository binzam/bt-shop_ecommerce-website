import UserProfile from './UserProfile';
import './UserOptions.css';
import RegisterForm from '../../Forms/RegisterForm';
import LoginForm from '../../Forms/LoginForm';
import { useContext } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { NavContext } from '../../../contexts/NavContext';
import ResetPassword from '../../Forms/ResetPassword';
import PasswordResetForm from '../../Forms/PasswordResetForm';
import LoginSignupButtons from '../LoginSignupButtons';

const UserOptions = () => {
  const { user } = useAuthContext();
  const {
    showLoginForm,
    showRegisterForm,
    showPasswordResetModal,
    showResetPasswordForm,
  } = useContext(NavContext);

  return (
    <div className="modal">
      <div className="modal_content">
        {user && <UserProfile />}

        {!user && (
          <>
            {!showRegisterForm &&
              !showLoginForm &&
              !showPasswordResetModal &&
              !showResetPasswordForm && <LoginSignupButtons />}
            {showRegisterForm && <RegisterForm />}
            {showLoginForm && <LoginForm />}
            {showPasswordResetModal && <ResetPassword />}
            {showResetPasswordForm && <PasswordResetForm />}
          </>
        )}
      </div>
    </div>
  );
};

export default UserOptions;
