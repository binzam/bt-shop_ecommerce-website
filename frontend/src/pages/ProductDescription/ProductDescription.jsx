import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../../assets/arrow-left.svg';
import './ProductDescription.css';
import CartIcon from '../../assets/icon-cart-btn.svg';
import PlusIcon from '../../assets/icon-plus.svg';
import MinusIcon from '../../assets/minus-icon.svg';
import { ProductContext } from '../../contexts/ProductContext.jsx';
import { NavContext } from '../../contexts/NavContext.jsx';
import Loading from '../../components/Loading.jsx';
import Error from '../../components/Error.jsx';
import StarIcon from '../../assets/star_icon.svg';
import ProductRatingForm from '../../components/Forms/ProductRatingForm.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';
const ProductDescription = () => {
  const { isAdmin } = useContext(AuthContext);

  const { products, loading, error } = useContext(ProductContext);
  const { addToCart } = useContext(NavContext);
  const { id } = useParams();
  const [displayedProduct, setDisplayedProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showRatingForm, setShowRatingForm] = useState(false);

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
      {loading && <Loading />}
      {error && <Error />}
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

          {!isAdmin() && (
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
          )}
        </div>
      </div>
      {!isAdmin() && (
        <button
          onClick={() => setShowRatingForm(!showRatingForm)}
          className="rate_prd_btn"
        >
          <img src={StarIcon} alt="star" />
          Rate Product
        </button>
      )}
      {showRatingForm && !isAdmin() && (
        <ProductRatingForm
          productId={id}
          setShowRatingForm={setShowRatingForm}
        />
      )}
    </div>
  );
};

export default ProductDescription;
