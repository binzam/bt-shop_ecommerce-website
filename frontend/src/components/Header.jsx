import { useEffect, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import CartIcon from '../assets/icon-cart.svg';
import UserIcon from '../assets/avatar.svg';
import UserOptions from './UserOptions';

const Header = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoggedIn(true);
    }
  }, []);

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

  const handleLogin = (data) => {
    setUserInfo(data);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    toggleUserPopup()
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
  const handleRegister = (data) => {
    setUserInfo(data);
    setIsLoggedIn(true);
    setShowRegisterModal(false);
    setShowLoginModal(false);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
  function toggleUserPopup() {
    setIsAccountPopupOpen(!isAccountPopupOpen);
  }

  // console.log(userInfo);
  return (
    <header>
      <a href="/home" className="logo-link">
        <span className="logo-text">bt-shop</span>
        {userInfo !== null && (
          <span className="username"> [ {userInfo?.username} ]</span>
        )}
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
              <img onClick={toggleUserPopup} src={UserIcon} alt="avatar" />
            </div>
          </li>
        </ul>
      </nav>
      <aside>
        {isAccountPopupOpen && (
          <UserOptions
            userInfo={userInfo}
            toggleUserPopup={toggleUserPopup}
            isLoggedIn={isLoggedIn}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenRegisterModal={handleOpenRegisterModal}
          />
        )}
        {showRegisterModal && (
          <RegisterForm
            handleRegister={handleRegister}
            handleClose={handleCloseRegisterModal}
          />
        )}
        {showLoginModal && (
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
