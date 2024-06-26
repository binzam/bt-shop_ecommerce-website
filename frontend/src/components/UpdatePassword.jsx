/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';

const UpdatePassword = ({ userInfo, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    handleUpdatePassword(currentPassword, newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleUpdatePassword = async (currentPassword, newPassword) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5555/users/update_pass/${userInfo._id}`,
        { currentPassword, newPassword }
      );

      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

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
    </form>
  );
};

export default UpdatePassword;
