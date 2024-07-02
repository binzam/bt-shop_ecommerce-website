/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import CartIcon from '../../assets/icon-cart-btn.svg';
import './ProductBox.css';
// rendered in products page
const ProductBox = ({ product, handleAddToCart }) => {
  return (
    <article className="product_box">
      <h3 className="product_title">{product.title.slice(0, 20)}</h3>
      <div className="product_image">
        <img src={product.image} alt={product.title} />
      </div>
      <span className="product_price">${product.price}</span>
      <button
        onClick={() => handleAddToCart(product)}
        className="prd_add_to_cart_btn"
      >
        <img src={CartIcon} alt="Cart" /> Add to Cart
      </button>
      <p className="product_description">
        {product.description.slice(0, 70)}...
      </p>
      <Link className="view_details_link" to={`/products/${product._id}`}>
        View Details
      </Link>
    </article>
  );
};

export default ProductBox;
