import { useContext } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import UserOptions from '../Register-Login-Profile/UserOptions';
import Navbar from './Navbar';
import Cart from './Cart/Cart';
import { CartContext } from '../../contexts/CartContext';
const Header = () => {
  const { user } = useAuthContext();
  const { showUserOptions, showCart, handleCloseModals } = useContext(CartContext);
  return (
    <header>
      <a href="/" className="logo">
        <span className="logo_text">bt-shop</span>
        {user && <span className="username">{user.username}</span>}
      </a>
      <Navbar />

      {showUserOptions && <UserOptions handleClose={handleCloseModals} />}
      {showCart && <Cart />}
    </header>
  );
};

export default Header;
