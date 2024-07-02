/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import UpdatePassword from './UpdatePassword';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CartContext } from '../../contexts/CartContext';

const UserProfile = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { handleCloseForms } = useContext(CartContext);
  const [showUpdatePassForm, setShowUpdatePassForm] = useState(false);
  const handleOpenChangePassword = () => {
    setShowUpdatePassForm(true);
  };
  const handleCloseChangePassword = () => {
    setShowUpdatePassForm(false);
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="modal">
      <div className="modal_content">
        <span onClick={handleCloseForms} className="close_user_profile">
          close
        </span>
        <br />
        <div className="user_info">
          <h2>User Profile</h2>
          <div>
            <strong>Name:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        </div>
        <div className="account_settings">
          <h2>Account Settings</h2>
          <div>
            <strong onClick={handleOpenChangePassword}>Change Password</strong>
            {showUpdatePassForm && (
              <UpdatePassword handleClose={handleCloseChangePassword} />
            )}
          </div>
          <div>
            <strong>Update Address</strong>
          </div>
          <div>
            <strong>Payment Methods</strong>
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
