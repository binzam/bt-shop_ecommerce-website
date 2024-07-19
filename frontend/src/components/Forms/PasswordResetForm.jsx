import { useContext, useState } from 'react';
import Loading from '../Loading';
import closeIcon from '../../assets/close_btn.svg';
import { NavContext } from '../../contexts/NavContext';
import { Link, useParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/useResetPassword';

const PasswordResetForm = () => {
  const { token } = useParams();
  // console.log(token);
  const { handleCloseModal, handleOpenLoginForm } = useContext(NavContext);
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
      alert('Please fill in all fields');
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
      <Link to="/home" onClick={handleCloseModal} className="close_popup_icon">
        <img src={closeIcon} alt="close login form" />
      </Link>

      {isLoading && <Loading />}

      {!isResetSuccessful ? (
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
        </form>
      ) : (
        <>
          <p className='success_reset_txt'>You have succefully reset your password.</p>
          <Link to="/auth/login" className="sign_in_btn">
            sign In
          </Link>
        </>
      )}
    </>
  );
};

export default PasswordResetForm;
