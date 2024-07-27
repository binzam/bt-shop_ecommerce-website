/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './AddToCartPopup.css';

const AddToCartPopup = ({ product }) => {
  const { image, title, price } = product;
  return (
    <div className="add_to_cart_popup">
      <div className="popup_header">Product added to cart!</div>
      <div className="pop_up_content">
        <div className="popup_image">
          <img src={image} alt="product" />
        </div>
        <div className="popup_detail">
          <div className="popup_title">{title.slice(0, 60)}</div>
          <div className="popup_price">${price}</div>
        </div>
      </div>
      <Link className='checkout_link' to='/checkout'>Checkout</Link>
    </div>
  );
};

export default AddToCartPopup;
