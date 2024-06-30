/* eslint-disable react/prop-types */
import { useContext } from 'react';
import closeIcon from '../../assets/close_btn.svg';
import RemoveIcon from '../../assets/icon-remove.svg';
import { ProductContext } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';
import './Cart.css';
const Cart = ({ handleCloseCart }) => {
  const { cartItems, removeFromCart } = useContext(ProductContext);
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };
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
        {cartItems && cartItems.length > 0 && (
          <ul className="cart_items_list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart_item">
                <div className="item_image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item_details">
                  <span className="item_title">{item.title}</span>
                  <div className="item_price_details">
                    <span className="item_price">{item.price}</span>
                    <span className="multiply_sign">&times;</span>
                    <span className="item_amount">{item.quantity}</span>
                    <span className="item_total">$135.00</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="remove_from_cart_btn"
                >
                  <img src={RemoveIcon} alt="remove" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cartItems && cartItems.length > 0 && (
        <Link className="cart_checkout_link" to="/checkout">
          CHECKOUT
        </Link>
      )}
    </div>
  );
};

export default Cart;
