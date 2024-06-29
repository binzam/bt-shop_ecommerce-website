/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../assets/arrow-left.svg';
import './ProductDescription.css';
import CartIcon from '../assets/icon-cart-btn.svg';
import PlusIcon from '../assets/icon-plus.svg';
import MinusIcon from '../assets/icon-minus.svg';

const ProductDescription = ({ products }) => {
  const { id } = useParams();
  const [productToView, setProductToView] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const selectedProduct = products.find((prd) => prd._id === id);
  useEffect(() => {
    if (selectedProduct) {
      setProductToView(selectedProduct);
    }
  }, [id, productToView, selectedProduct]);
  const { image, title, price, description } = productToView;
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  /* FUNCTION FOR MINUS BUTTON / decrease quantity*/
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (product, quantity) => {};
  const handleAddToCart = () => {
    addTocart(selectedProduct, quantity);
  };
  return (
    <div className="product_description_page">
      <Link className="back_btn" to="/products">
        <img src={Arrow} alt="back button" />
        Back
      </Link>
      <div className="product_info">
        <div className="product_image_div">
          <img src={image} alt={title} />
        </div>
        <div className="product_details">
          <h2 className="prd_name">{title}</h2>
          <strong className="prd_price">${price}</strong>
          <p className="prd_description">{description}</p>
          <div className="add_select_product">
            <div className="quantity_selector">
              <button onClick={decreaseQuantity} className="minus_btn">
                <img src={MinusIcon} alt="minus" />
              </button>
              <span className="quantity">{quantity}</span>
              <button onClick={increaseQuantity} className="plus_btn">
                <img src={PlusIcon} alt="Plus" />
              </button>
            </div>

            <button onClick={handleAddToCart} className="add_to_cart_btn">
              Add to Cart
              <img src={CartIcon} alt="Cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
