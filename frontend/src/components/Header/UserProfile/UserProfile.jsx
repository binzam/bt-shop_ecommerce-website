import { useContext } from 'react';
import { useLogout } from '../../../hooks/useLogout';
import { NavContext } from '../../../contexts/NavContext';
import { Link, useNavigate } from 'react-router-dom';
import './UserProfile.css';
import closeIcon from '../../../assets/close_btn.svg';
import SignoutIcon from '../../../assets/sign-out.svg';
import UserSettings from './UserSettings';
import UserDetails from './UserDetails';
import { useAuthContext } from '../../../hooks/useAuthContext';

const UserProfile = () => {
  const { user, isAdmin } = useAuthContext();

  const { logout } = useLogout();
  const { handleCloseModal, handleClearCart } = useContext(NavContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    handleClearCart();
    handleCloseModal();
    logout();
    navigate('/home');
  };

  return (
    <div className="user_profile">
      <Link to="/home" onClick={handleCloseModal} className="close_popup_icon">
        <img src={closeIcon} alt="close profile" />
      </Link>

      <UserDetails user={user} />
      <UserSettings isAdmin={isAdmin} />

      <button className="logout_btn" onClick={handleLogout}>
        <img src={SignoutIcon} alt="sign out" />
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
