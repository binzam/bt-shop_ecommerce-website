import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import CartIcon from '../assets/icon-cart.svg';
import UserIcon from '../assets/avatar.svg';
import UserOptions from './UserOptions';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {
  const { user } = useAuthContext();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
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
      <a href="/home" className="logo-link">
        <span className="logo-text">bt-shop</span>
        {user && <span className="username"> [ {user.username} ]</span>}
      </a>
      <nav className="navigation">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/categories/all" className="nav-link">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/categories/mens-clothing" className="nav-link">
              Men
            </Link>
          </li>
          <li>
            <Link to="/categories/womens-clothing" className="nav-link">
              Women
            </Link>
          </li>
        </ul>
        <ul className="nav-links">
          <li>
            <div className="cart-nav">
              <img src={CartIcon} alt="Cart-icon" className="cart-icon" />

              <span className="cart-counter">0</span>
            </div>
          </li>
          <li>
            <div className="user-profile-pic">
              <img onClick={toggleUserModal} src={UserIcon} alt="avatar" />
            </div>
          </li>
        </ul>
      </nav>
      <aside>
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
      </aside>
    </header>
  );
};

export default Header;
