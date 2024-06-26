/* eslint-disable react/prop-types */
import { useState } from 'react';
import UpdatePassword from './UpdatePassword';

const UserProfile = ({ userInfo, handleClose }) => {
  const [showUpdatePassForm, setShowUpdatePassForm] = useState(false);
  const handleOpenChangePassword = () => {
    setShowUpdatePassForm(true);
  };
  const handleCloseChangePassword = () => {
    setShowUpdatePassForm(false);
  };
  console.log(userInfo);
  return (
    <div className="modal">
      <span onClick={handleClose} className="close_modal">
        close
      </span>
      <br />
      <div className="user_info">
        <h2>User Profile</h2>
        <div>
          <strong>Name:</strong> {userInfo.username}
        </div>
        <div>
          <strong>Email:</strong> {userInfo.email}
        </div>
      </div>
      <div className="account_settings">
        <h2>Account Settings</h2>
        <div>
          <strong onClick={handleOpenChangePassword}>Change Password</strong>
          {showUpdatePassForm && (
            <UpdatePassword
              handleClose={handleCloseChangePassword}
              userInfo={userInfo}
            />
          )}
        </div>
        <div>
          <strong>Update Address</strong>
        </div>
        <div>
          <strong>Payment Methods</strong>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
