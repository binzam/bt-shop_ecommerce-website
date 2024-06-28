/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const UpdatePassword = ({ handleClose }) => {
  const { user } = useAuthContext();

  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    handleUpdatePassword(currentPassword, newPassword);
    // setCurrentPassword('');
    // setNewPassword('');
    // setConfirmPassword('');
  };
  const handleUpdatePassword = async (currentPassword, newPassword) => {
    try {
      const response = await axios.put(
        'http://localhost:5555/users/update_pass',
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      handleClose();
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  // abcABC123$
  return (
    <form onSubmit={handleSubmitPassword}>
      <label>Current Password:</label>
      <br />
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
      <div>
        <label>New Password:</label>
        <br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <br />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Password</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdatePassword;
