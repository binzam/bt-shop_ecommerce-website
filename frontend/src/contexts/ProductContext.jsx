/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

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
  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`/api/remove_product/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove product: ' + response.statusText);
      }
      const data = await response.json();
      if (data.productRemoved) {
        fetchProducts();
        console.log('Product removed successfully', data);
      } else {
        console.log('Failed to remove product:', data.error);
      }
    } catch (error) {
      console.log('Error removing product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContextProvider, ProductContext };
