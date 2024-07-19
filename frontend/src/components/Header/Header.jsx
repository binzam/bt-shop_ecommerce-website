import { useContext } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import UserOptions from './UserModals/UserOptions';
import Navbar from './Navbar/Navbar';
import Cart from './Cart/Cart';
import { NavContext } from '../../contexts/NavContext';
const Header = () => {
  const { user } = useAuthContext();

  const { showUserOptions, showCart } = useContext(NavContext);

  return (
    <header>
      <a href="/home" className="logo">
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
