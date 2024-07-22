/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import CartIcon from '../../../assets/icon-cart.svg';
import UserIcon from '../../../assets/avatar.svg';
import { useContext, useState } from 'react';
import { NavContext } from '../../../contexts/NavContext.jsx';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import adminIcon from '../../../assets/adminIcon.svg';
import MenuIcon from '../../../assets/icon-menu.svg';
import CloseMenuIcon from '../../../assets/close-for-menu.svg';
import './Navbar.css'
const Navbar = () => {
  const { isAdmin } = useContext(AuthContext);
  const { cartItems, toggleCart, handleOpenUserOptions } =
    useContext(NavContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function closeDropdown() {
    setIsDropdownOpen(false);
  }

  const handleClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navigation">
      {isDropdownOpen ? (
        <button onClick={closeDropdown} className="close_dropdown_btn">
          <img src={CloseMenuIcon} alt="close menu" />
        </button>
      ) : (
        <button onClick={toggleDropdown} className="open_dropdown_btn">
          <img src={MenuIcon} alt="menu" />
        </button>
      )}
      <ul className={`nav_links ${isDropdownOpen ? "show" : "hide"}`}>
        <li>
          <Link onClick={() => handleClick()} to="/home" className="nav_link">
            Home
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClick()}
            to="/products"
            className="nav_link"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClick()}
            to="/checkout"
            className="nav_link"
          >
            Checkout
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClick()}
            to="/orders"
            className="nav_link"
          >
            Orders
          </Link>
        </li>
      </ul>
      <ul className="nav_icons">
        <li>
          {isAdmin() ? (
            <Link to="/admin" className="admin_link">
              <img src={adminIcon} alt="avatar" />
            </Link>
          ) : (
            <div
              onClick={toggleCart}
              className="cart_icon_wrapper"
              title="Cart"
            >
              <img src={CartIcon} alt="Cart icon" className="cart-icon" />

              {cartItems && (
                <span className="cart_counter">{cartItems.length}</span>
              )}
            </div>
          )}
        </li>
        <li>
          {/* <div
            onClick={handleOpenUserOptions}
            className="user_profile_icon"
            title="User"
          >
            <img src={UserIcon} alt="avatar" />
          </div> */}
          <Link
            onClick={handleOpenUserOptions}
            to='/auth'
            className="user_profile_icon"
            title="User"
          >
            <img src={UserIcon} alt="avatar" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
