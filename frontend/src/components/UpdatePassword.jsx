/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';

const UpdatePassword = ({ userInfo, handleClose }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    
    handleUpdatePassword(password, newPassword);
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleUpdatePassword = async (password, newPassword) => {
    const [firstName, lastName] = userInfo.username.split(' ');
    try {
      const response = await axios.put(
        `http://localhost:5555/users/${userInfo._id}`,
        {
          firstName,
          lastName,
          email: userInfo.email,
          password: newPassword,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        handleClose()
      } else {
        console.error('Password update failed:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while updating the password:', error);
    }
  };

  return (
    <form onSubmit={handleSubmitPassword}>
      <label>Current Password:</label>
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
