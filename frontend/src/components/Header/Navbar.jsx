/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import CartIcon from '../../assets/icon-cart.svg';
import UserIcon from '../../assets/avatar.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext.jsx';

const Navbar = () => {
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
            Shop
          </Link>
        </li>
        <li>
          <Link to="/categories/mens-clothing" className="nav_link">
            Men
          </Link>
        </li>
        <li>
          <Link to="/categories/womens-clothing" className="nav_link">
            Women
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
