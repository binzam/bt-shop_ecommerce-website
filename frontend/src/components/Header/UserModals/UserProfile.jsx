/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import UpdatePassword from '../../Forms/UpdatePassword';
import { useLogout } from '../../../hooks/useLogout';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { NavContext } from '../../../contexts/NavContext';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { handleCloseModal, handleClearCart } = useContext(NavContext);
  const navigate = useNavigate();

  const [showUpdatePassForm, setShowUpdatePassForm] = useState(false);
  const handleOpenChangePassword = () => {
    setShowUpdatePassForm(!showUpdatePassForm);
  };
  const handleCloseChangePassword = () => {
    setShowUpdatePassForm(false);
  };
  const handleLogout = () => {
    logout();
    navigate('/home');
    handleClearCart();
    handleCloseModal();
  };
  return (
    <div className="user_profile">
      <Link
        to="/home"
        onClick={handleCloseModal}
        className="close_user_profile"
      >
        close
      </Link>
      <br />
      <div className="user_info">
        {user.role === 'admin' ? (
          <span className="admin_"> ADMIN</span>
        ) : (
          <h2>User Profile</h2>
        )}
        <div>
          <strong>Name:</strong> {user.username}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
      </div>
      <div className="account_settings">
        <div>
          <strong
            className="change_pass_btn"
            onClick={handleOpenChangePassword}
          >
            Change Password
          </strong>
          {showUpdatePassForm && (
            <UpdatePassword handleClose={handleCloseChangePassword} />
          )}
        </div>
      </div>
      <button className="logout_btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
