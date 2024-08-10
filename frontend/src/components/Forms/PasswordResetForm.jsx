import { useContext, useState } from 'react';
import Loading from '../Loading';
import closeIcon from '../../assets/close_btn.svg';
import { ShopContext } from '../../contexts/ShopContext';
import { useResetPassword } from '../../hooks/useResetPassword';
import './Forms.css';

const PasswordResetForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('reset_token');

  const { handleCloseModal, handleOpenLoginForm } = useContext(ShopContext);
  const [error, setError] = useState(null);
  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const { newPassword, confirmNewPassword } = resetPasswordForm;
  const handleChange = (e) => {
    setResetPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value,
    });
  };
  const { resetPassword, resetError, isLoading, isResetSuccessful } =
    useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('PASSWORD MUST MATCH!');
      return;
    }
    await resetPassword(token, newPassword);
    if (isResetSuccessful) {
      handleCloseModal();
      handleOpenLoginForm();
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      {!isResetSuccessful ? (
        <>
          <button onClick={handleCloseModal} className="close_modal">
            <img src={closeIcon} alt="close login form" />
          </button>
          <form className="reset_password_form" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>

            <div className="login_form_group">
              <label htmlFor="newPassword">New password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Create a new password"
                value={newPassword}
                onChange={handleChange}
                required
                autoComplete="false"
              />
            </div>
            <div className="login_form_group">
              <label htmlFor="confirmNewPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={handleChange}
                required
                autoComplete="false"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="new_pass_form_btn"
            >
              Reset Password
            </button>
            {resetError && <div className="form_error">{resetError}</div>}
            {error && <div className="form_error">{error}</div>}
          </form>
        </>
      ) : (
        <div className="success_reset_div">
          <p className="success_reset_txt">
            You have succefully reset your password.
          </p>
          <button onClick={handleOpenLoginForm} className="sign_in_btn">
            Sign In
          </button>
        </div>
      )}
    </>
  );
};

export default PasswordResetForm;
