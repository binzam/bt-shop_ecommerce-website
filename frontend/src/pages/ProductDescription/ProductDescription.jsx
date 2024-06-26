import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../../assets/arrow-left.svg';
import './ProductDescription.css';
import CartIcon from '../../assets/icon-cart-btn.svg';
import PlusIcon from '../../assets/icon-plus.svg';
import MinusIcon from '../../assets/icon-minus.svg';
import { ProductContext } from '../../contexts/ProductContext.jsx';
import { CartContext } from '../../contexts/CartContext.jsx';

const ProductDescription = () => {
  const { products, loading, error } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [displayedProduct, setDisplayedProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = products.find((prd) => prd._id === id);
  useEffect(() => {
    if (selectedProduct) {
      setDisplayedProduct(selectedProduct);
    }
  }, [id, displayedProduct, selectedProduct]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  
  const { image, title, price, description } = displayedProduct;
  
  const handleAddToCart = () => {
    addToCart(displayedProduct, quantity);
  };
  return (
    <div className="product_description_page">
      {loading && (
        <div className="loading_container">
          <div className="loading_animation"></div>
        </div>
      )}
      {error && (
        <div className="error_container">
          <div className="error_message">Error: {error}</div>
        </div>
      )}
      <Link className="back_btn" to="/products">
        <img src={Arrow} alt="back button" />
        Back
      </Link>

      {!loading && !error && (
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

              <button
                onClick={() => handleAddToCart()}
                className="add_to_cart_btn"
              >
                Add to Cart
                <img src={CartIcon} alt="Cart" />
              </button>
              <Link to="/checkout" className="prd_checkout_btn">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
