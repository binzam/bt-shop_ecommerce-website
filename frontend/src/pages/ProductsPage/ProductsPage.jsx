import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext.jsx';
import './ProductsPage.css';
import ProductBox from '../../components/ProductBox/ProductBox.jsx';
import { useParams } from 'react-router-dom';
import AddToCartPopup from '../../components/AddToCartPopup/AddToCartPopup.jsx';
import { NavContext } from '../../contexts/NavContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import AddProductForm from '../../components/Forms/AddProductForm.jsx';
import addIcon from '../../assets/add_icon.svg';

const ProductsPage = () => {
  const { category } = useParams();
  const { products, loading, error } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showPopup, setShowPopup] = useState(false);
  const [addedPrd, setAddedPrd] = useState(null);
  const { addToCart } = useContext(NavContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const { isAdmin } = useContext(AuthContext);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    setShowPopup(true);
    setAddedPrd(product);
  };
  useEffect(() => {
    if (addedPrd) {
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [addedPrd]);
  const categories = [
    { name: 'All', value: '' },
    { name: "Men's Clothing", value: "men's clothing" },
    { name: "Women's Clothing", value: "women's clothing" },
    { name: 'Jewelery', value: 'jewelery' },
    { name: 'Electronics', value: 'electronics' },
  ];
  const sortOptions = [
    { name: 'Low to High', value: 'asc' },
    { name: 'High to Low', value: 'desc' },
  ];

  const filterByCategory = (category) => {
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
  const closeForm = () => {
    setShowAddForm(false);
  };
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
          {categories.map((category) => (
            <button
              key={category.value}
              className={`category_btn ${
                selectedCategory === category.value ? 'active' : ''
              }`}
              onClick={() => filterByCategory(category.value)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <h4 className="sort_title">PRICE</h4>
        <div className="price_sorting_bar">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`sort_by_price_btn ${
                sortOrder === option.value ? 'active' : ''
              }`}
              onClick={() => sortByPrice(option.value)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
      <div className="products_list">
        {isAdmin() && !showAddForm && (
          <article className="add_product" onClick={() => setShowAddForm(true)}>
            <h3 className="add_product_txt">Add New Product</h3>
            <img className="add_product_icon" src={addIcon} alt="add product" />
          </article>
        )}
        {isAdmin() && showAddForm && (
          <AddProductForm closeForm={closeForm} />
        )}
        {filteredProducts.map((product) => (
          <ProductBox
            addToCart={handleAddToCart}
            product={product}
            key={product._id}
          />
        ))}
      </div>
      {showPopup && addedPrd && <AddToCartPopup product={addedPrd} />}
    </div>
  );
};

export default ProductsPage;
