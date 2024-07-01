/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5555/products');
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

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContextProvider, ProductContext };