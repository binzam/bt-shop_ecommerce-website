/* eslint-disable react/prop-types */
import closeIcon from '../../assets/close_btn.svg';
import RemoveIcon from '../../assets/icon-remove.svg';

const Cart = ({ handleCloseCart }) => {
  return (
    <div className="cart_modal">
      <div className="cart_modal_content">
        <div className="cart">
          <p className="cart_header">Cart</p>
          <div onClick={handleCloseCart} className="close_cart">
            <img src={closeIcon} alt="close cart" />
          </div>
          <div className="cart_content">
            <ul className="cart_items_list">
              <li className="cart_item">
                <div className="item_image">
                  <img src="" alt="" />
                </div>
                <div className="item_details">
                  <span className="item_title">Jacket</span>
                  <div className="item_price_details">
                    <span className="item_price">45.00</span>
                    <span className="multiply_sign">&times;</span>
                    <span className="item_amount">3</span>
                    <span className="item_total">$135.00</span>
                  </div>
                </div>
                <button className="item_remove_btn">
                  <img src={RemoveIcon} alt="remove" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
