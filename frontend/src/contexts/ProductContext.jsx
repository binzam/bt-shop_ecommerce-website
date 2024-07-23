/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/products');
      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }
      const data = response.data.data;
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useContext(AuthContext);
  const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5555/api/admin/remove_product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.productRemoved) {
        fetchProducts();
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const addNewProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        'http://localhost:5555/api/admin/add_product',
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.productAdded) {
        fetchProducts();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, removeProduct, addNewProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContextProvider, ProductContext };
