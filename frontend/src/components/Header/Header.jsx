import { useContext } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import Navbar from './Navbar/Navbar';
import Cart from './Cart/Cart';
import { ShopContext } from '../../contexts/ShopContext';
const Header = () => {
  const { user } = useAuthContext();
  const { showCart } = useContext(ShopContext);

  return (
    <header>
      <a href="/home" className="logo">
        <span className="logo_text">bt-shop</span>
        {user && <span className="username">{user.username}</span>}
      </a>

      <Navbar />

      {showCart && <Cart />}
    </header>
  );
};

export default Header;
