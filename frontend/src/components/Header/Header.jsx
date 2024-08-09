import { useContext } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import Navbar from './Navbar/Navbar';
import Cart from './Cart/Cart';
import { ShopContext } from '../../contexts/ShopContext';
import Modal from './Modal/Modal';
const Header = () => {
  const { user } = useAuthContext();
  const { showCart, showModal } = useContext(ShopContext);

  return (
    <header>
      <a href="/home" className="logo">
        <span className="logo_text">bt-shop</span>
        {user && <span className="username">{user.username}</span>}
      </a>

      <Navbar />

      {showCart && <Cart />}
      {showModal && <Modal />}
    </header>
  );
};

export default Header;
