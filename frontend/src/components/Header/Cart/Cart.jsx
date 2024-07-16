/* eslint-disable react/prop-types */
import { useContext } from 'react';
import closeIcon from '../../../assets/close_btn.svg';
import { NavContext } from '../../../contexts/NavContext.jsx';
import { Link } from 'react-router-dom';
import './Cart.css';
import CartItems from './CartItems.jsx';

const Cart = () => {
  const { cartItems, handleCloseCart } = useContext(NavContext);

  return (
    <div className="cart">
      <p className="cart_header">Cart</p>
      <div onClick={handleCloseCart} className="close_cart">
        <img src={closeIcon} alt="close cart" />
      </div>
      <div className="cart_content">
        {!cartItems ||
          (cartItems.length < 1 && (
            <span className="empty_cart_txt">Your cart is empty</span>
          ))}
        {cartItems && cartItems.length > 0 && <CartItems />}
      </div>
      {cartItems && cartItems.length > 0 && (
        <Link onClick={handleCloseCart} className="cart_checkout_link" to="/checkout">
          CHECKOUT
        </Link>
      )}
    </div>
  );
};

export default Cart;
