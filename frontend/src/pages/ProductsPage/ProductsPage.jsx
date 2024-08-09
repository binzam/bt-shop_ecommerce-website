import { useContext, useEffect, useMemo, useState } from 'react';
import './ProductsPage.css';
import ProductBox from '../../components/ProductBox/ProductBox.jsx';
import { useParams } from 'react-router-dom';
import AddToCartPopup from '../../components/AddToCartPopup/AddToCartPopup.jsx';
import { ShopContext } from '../../contexts/ShopContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import AddProductForm from '../../components/Forms/AddProductForm.jsx';
import addIcon from '../../assets/add_icon.svg';
import Loading from '../../components/Loading.jsx';
import ProductFilterBar from './ProductFilterBar.jsx';
const POPUP_TIMEOUT = 3000;
const ProductsPage = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const { addToCart, products, loading, error } = useContext(ShopContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const { isAdmin } = useContext(AuthContext);

  
  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [filteredProducts, sortOrder]);
 
  // let filteredProducts = selectedCategory
  //   ? products.filter((product) => product.category === selectedCategory)
  //   : products;
  // filteredProducts = filteredProducts.slice().sort((a, b) => {
  //   if (sortOrder === 'asc') {
  //     return a.price - b.price;
  //   } else {
  //     return b.price - a.price;
  //   }
  // });
  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    setShowPopup(true);
    setAddedProduct(product);
  };
  useEffect(() => {
    if (addedProduct) {
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, POPUP_TIMEOUT);
      return () => clearTimeout(timeout);
    }
  }, [addedProduct]);
  const closeForm = () => {
    setShowAddForm(false);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="products_page">
      {error && <div className="form_error">{error}</div>}

      <ProductFilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <div className="products_list">
        {isAdmin() && !showAddForm && (
          <article className="add_product" onClick={() => setShowAddForm(true)}>
            <h3 className="add_product_txt">Add New Product</h3>
            <img className="add_product_icon" src={addIcon} alt="add product" />
          </article>
        )}
        {isAdmin() && showAddForm && <AddProductForm closeForm={closeForm} />}
        {sortedProducts.map((product) => (
          <ProductBox
            addToCart={handleAddToCart}
            product={product}
            key={product._id}
          />
        ))}
      </div>
      {showPopup && addedProduct && <AddToCartPopup product={addedProduct} />}
    </div>
  );
};

export default ProductsPage;
