/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import CartIcon from '../../assets/icon-cart.svg';
import UserIcon from '../../assets/avatar.svg';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';

const Navbar = ({ openUserOptions, openCart }) => {
  const { cartItems } = useContext(ProductContext);
  return (
    <nav className="navigation">
      <ul className="nav_links">
        <li>
          <Link to="/" className="nav_link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/categories/all" className="nav_link">
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
          <div onClick={openCart} className="cart_icon_wrapper" title="Cart">
            <img src={CartIcon} alt="Cart icon" className="cart-icon" />

            {cartItems && (
              <span className="cart_counter">{cartItems.length}</span>
            )}
          </div>
        </li>
        <li>
          <div
            onClick={openUserOptions}
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
