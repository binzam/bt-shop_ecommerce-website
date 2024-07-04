/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import CartIcon from '../../assets/icon-cart.svg';
import UserIcon from '../../assets/avatar.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext.jsx';
// import { AuthContext } from '../../contexts/AuthContext.jsx';

const Navbar = () => {
  // const { user } = useContext(AuthContext);
  const { cartItems, toggleCart, handleOpenUserOptions } =
    useContext(CartContext);

  return (
    <nav className="navigation">
      <ul className="nav_links">
        <li>
          <Link to="/" className="nav_link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav_link">
            Products
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav_link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/checkout" className="nav_link">
            Checkout
          </Link>
        </li>
      </ul>
      <ul className="nav_icons">
        <li>
          <div onClick={toggleCart} className="cart_icon_wrapper" title="Cart">
            <img src={CartIcon} alt="Cart icon" className="cart-icon" />

            {cartItems && (
              <span className="cart_counter">{cartItems.length}</span>
            )}
          </div>
        </li>
        <li>
          <div
            onClick={handleOpenUserOptions}
            className="user_profile_icon"
            title="User"
          >
            <img src={UserIcon} alt="avatar" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
