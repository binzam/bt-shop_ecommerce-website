/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Forms.css';
import Loading from '../Loading';
import axiosInstance from '../../utils/axiosInstance';

const UpdatePassword = ({ handleClose }) => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentPassword, newPassword, confirmPassword } = form;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      handleUpdatePassword(currentPassword, newPassword);
      setError(null);
    } else {
      setError('Passwords do not match');
    }
  };
  const handleUpdatePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put('/users/update_pass', {
        currentPassword,
        newPassword,
      });
      if (response) {
        setIsLoading(false);
      }
      if (response.data.passwordChangeSuccess) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.data));
        handleClose();
      }
      console.log(response);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="update_password_form" onSubmit={handleSubmitPassword}>
      {error && <div className="form_error">{error}</div>}
      {isLoading && <Loading />}
      <label htmlFor="currentPassword">Current Password:</label>
      <br />
      <input
        id="currentPassword"
        name="currentPassword"
        type="password"
        value={currentPassword}
        onChange={handleChange}
        autoComplete="false"
        required
      />
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <br />
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={handleChange}
          autoComplete="false"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <br />

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          autoComplete="false"
          required
        />
      </div>
      <button disabled={isLoading} className="update_pass_btn" type="submit">
        Update Password
      </button>
    </form>
  );
};

export default UpdatePassword;
