import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import UserOptions from '../Register-Login-Profile/UserOptions';
import Navbar from './Navbar';
import Cart from './Cart/Cart';
const Header = () => {
  const { user } = useAuthContext();

  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showCart, setShowCart] = useState(false);

  function handleOpenUserOptions() {
    setShowUserOptions(true);
    setShowCart(false);
  }
  function toggleCart() {
    setShowCart(!showCart);
  }
  function handleCloseCart() {
    setShowCart(false);
  }
  const handleCloseModals = () => {
    setShowUserOptions(false);
  };

  return (
    <header>
      <a href="/" className="logo">
        <span className="logo_text">bt-shop</span>
        {user && <span className="username">{user.username}</span>}
      </a>
      <Navbar openUserOptions={handleOpenUserOptions} toggleCart={toggleCart} />

      {showUserOptions && <UserOptions handleClose={handleCloseModals} />}
      {showCart && <Cart handleCloseCart={handleCloseCart} />}
    </header>
  );
};

export default Header;
