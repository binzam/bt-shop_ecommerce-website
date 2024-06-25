import { useEffect, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const Header = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoggedIn(true);
    }
  }, []);
  const handleOpenUserProfile = () => {
    setShowUserProfile(true);
  };
  const handleCloseUserProfile = () => {
    setShowUserProfile(false);
  };
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
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
  const handleRegister = (data) => {
    setUserInfo(data);
    setIsLoggedIn(true);
    setShowRegisterModal(false);
    setShowLoginModal(false);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
  const handleLogout = () => {
    setUserInfo(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userInfo');
  };
  console.log(userInfo);
  return (
    <header>
      This is a Header
      {isLoggedIn && (
        <div>
          Welcome {userInfo.username}
          <button onClick={handleLogout}>Logout</button>
        
        </div>
      )}
      <nav>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Men</li>
          <li>Women</li>
        </ul>
        <ul>
          <li>Cart</li>
          {isLoggedIn ? (
            <li><button onClick={handleOpenUserProfile}>User Profile</button></li>
          ) : (
            <li>
              <button onClick={handleOpenRegisterModal}>Sign up</button>

              <button onClick={handleOpenLoginModal}>Login</button>
            </li>
          )}
        </ul>
      </nav>
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
        {showUserProfile && <UserProfile handleClose={handleCloseUserProfile}  userInfo={userInfo} />}
    </header>
  );
};

export default Header;
