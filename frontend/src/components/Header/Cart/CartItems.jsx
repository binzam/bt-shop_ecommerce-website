/* eslint-disable react/prop-types */
import RemoveIcon from '../../../assets/icon-remove.svg';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext.jsx';

const CartItems = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };
  const calculateTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };
  return (
    <ul className="cart_items_list">
      {cartItems.map((item) => (
        <li key={item._id} className="cart_item">
          <div className="item_image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="item_details">
            <span className="item_title">{item.title}</span>
            <div className="item_price_details">
              <span className="item_price">${item.price}</span>
              <span className="multiply_sign">&times;</span>
              <span className="item_amount">{item.quantity}</span>
              <span className="item_total">
                ${calculateTotal(item.price, item.quantity)}
              </span>
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
  );
};

export default CartItems;
