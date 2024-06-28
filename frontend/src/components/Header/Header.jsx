import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../../assets/icon-cart.svg';
import UserIcon from '../../assets/avatar.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import RegisterForm from '../Register-Login-Profile/RegisterForm';
import LoginForm from '../Register-Login-Profile/LoginForm';
import UserOptions from '../Register-Login-Profile/UserOptions';
const Header = () => {
  const { user } = useAuthContext();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
    setShowUserOptions(false);
  };
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    setShowUserOptions(false);

  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    toggleUserModal();
  };
  const handleRegister = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
  };
  function toggleUserModal() {
    setShowUserOptions(!showUserOptions);
  }

  return (
    <header>
      <a href="/home" className="logo">
        <span className="logo_text">bt-shop</span>
        {user && <span className="username">{user.username}</span>}
      </a>
      <nav className="navigation">
        <ul className="nav_links">
          <li>
            <Link to="/" className="nav_link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/categories/all" className="nav_link">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/categories/mens-clothing" className="nav_link">
              Men
            </Link>
          </li>
          <li>
            <Link to="/categories/womens-clothing" className="nav_link">
              Women
            </Link>
          </li>
        </ul>
        <ul className="nav_icons">
          <li>
            <div className="cart_icon_wrapper" title="Cart">
              <img src={CartIcon} alt="Cart icon" className="cart-icon" />

              <span className="cart_counter">10</span>
            </div>
          </li>
          <li>
            <div className="user_profile_icon" title="User">
              <img onClick={toggleUserModal} src={UserIcon} alt="avatar" />
            </div>
          </li>
        </ul>
      </nav>

      {showUserOptions && (
        <UserOptions
          toggleUserModal={toggleUserModal}
          handleOpenLoginModal={handleOpenLoginModal}
          handleOpenRegisterModal={handleOpenRegisterModal}
        />
      )}
      {showRegisterModal && !user && (
        <RegisterForm
          handleRegister={handleRegister}
          handleClose={handleCloseRegisterModal}
        />
      )}
      {showLoginModal && !user && (
        <LoginForm
          handleLogin={handleLogin}
          handleClose={handleCloseLoginModal}
        />
      )}
    </header>
  );
};

export default Header;
