import { useContext, useEffect, useState } from 'react';
// import { ProductContext } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';
import './TrendingProducts.css';
import Error from '../Error';
import Loading from '../Loading';
import { ShopContext } from '../../contexts/ShopContext';
const TrendingProducts = () => {
  const { products, loading, error } = useContext(ShopContext);
  const [topProducts, setTopProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const sortedProducts = [...products].sort(
      (a, b) => b['rating'] - a['rating']
    );
    const top5Products = sortedProducts.slice(0, 5);
    setTopProducts(top5Products);
  }, [products]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % topProducts.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [topProducts.length]);
  return (
     
    <section className="trending_products">
      <h2 className='trending_header'>Trending Products</h2>
      <div className="slide_wrapper">
        {topProducts.map((product, index) => (
          <div
            key={product._id}
            className={`slider_item ${index === currentSlide ? 'active' : ''}`}
          >
            <h3 className="trending_product_title">
              {product.title.slice(0, 30)}
            </h3>
            <div className="rating">
              Customer rating:{' '}
              <span className="rating_value">{product['rating']}</span> / 5
            </div>
            <div className="img_div">
              <img src={product.image} alt="product" />
            </div>
            <span className="trending_price">${product.price}</span>
            <Link className="link" to={`/products/${product._id}`}>
              View Product
            </Link>
          </div>
        ))}
         {error && <Error />}
         {loading && <Loading />}
      </div>
    </section>
  );
};

export default TrendingProducts;
