import { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext.jsx';
import './ProductsPage.css';
import { CartContext } from '../../contexts/CartContext.jsx';
import ProductBox from '../../components/ProductBox/ProductBox.jsx';
const ProductsPage = () => {
  const { products, loading, error } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const filterByCategory = (category) => {
    if (!category) {
      setSelectedCategory(products);
    }
    setSelectedCategory(category);
  };
  const sortByPrice = (order) => {
    setSortOrder(order);
  };
  
  let filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  filteredProducts = filteredProducts.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="products_page">
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
      <div className="product_filter_bar">
        <h4 className="category_title">{selectedCategory || 'All'}</h4>
        <div className="categories">
          <button className="category_btn" onClick={() => filterByCategory('')}>
            All
          </button>
          <button
            className="category_btn"
            onClick={() => filterByCategory("men's clothing")}
          >
            Men
          </button>
          <button
            className="category_btn"
            onClick={() => filterByCategory("women's clothing")}
          >
            Women
          </button>
          <button
            className="category_btn"
            onClick={() => filterByCategory('jewelery')}
          >
            Jewelry
          </button>
          <button
            className="category_btn"
            onClick={() => filterByCategory('electronics')}
          >
            Electronics
          </button>
        </div>
        <h4 className="sort_title">PRICE</h4>
        <div className="price_sorting_bar">
          <button
            className="sort_by_price_btn"
            onClick={() => sortByPrice('asc')}
          >
            Low to High
          </button>
          <button
            className="sort_by_price_btn"
            onClick={() => sortByPrice('desc')}
          >
            High to Low
          </button>
        </div>
      </div>
      <div className="products_list">
        {products &&
          filteredProducts.map((product) => (
            <ProductBox
              handleAddToCart={handleAddToCart}
              product={product}
              key={product._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;
