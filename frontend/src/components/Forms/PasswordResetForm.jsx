/* eslint-disable react/prop-types */
import { useState } from 'react';
import Loading from '../Loading';
import closeIcon from '../../assets/close_btn.svg';

const PasswordResetForm = ({ handleClose }) => {
  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setResetPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value,
    });
  };
  const { newPassword, confirmNewPassword } = resetPasswordForm;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      // Call an API to reset the password
      await createNewPassword(newPassword);
      // Show a success message or redirect the user
      console.log('Password reset successfully!');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const createNewPassword = async (newPassword) => {
    console.log('Resetting password to:', newPassword);
  };
  return (
    <>
      <div onClick={handleClose} className="close_popup_icon">
        <img src={closeIcon} alt="close login form" />
      </div>

      {isLoading && <Loading />}

      <form className="reset_password_form" onSubmit={handleSubmit}>
        <h2>Create a New Password</h2>

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
        {error && <div className="form_error">{error}</div>}
      </form>
    </>
  );
};

export default PasswordResetForm;
