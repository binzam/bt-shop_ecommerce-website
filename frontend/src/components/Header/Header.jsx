import { useContext } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import UserOptions from './UserModals/UserOptions';
import Navbar from './Navbar';
import Cart from './Cart/Cart';
import { CartContext } from '../../contexts/CartContext';
const Header = () => {
  const { user } = useAuthContext();

  const { showUserOptions, showCart } = useContext(CartContext);

  return (
    <header>
      <a href="/" className="logo">
        <span className="logo_text">bt-shop</span>
        {user && <span className="username">{user.username}</span>}
      </a>
      <Navbar />

      {showUserOptions && <UserOptions />}
      {showCart && <Cart />}
    </header>
  );
};

export default Header;
