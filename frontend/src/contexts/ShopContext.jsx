/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { saveCartToDatabase } from '../utils/userUtils';
import { AuthContext } from './AuthContext';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('reset_token');

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
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
      const response = await axiosInstance.delete(
        `/admin/remove_product/${productId}`
      );

      if (response.data.productRemoved) {
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addNewProduct = async (newProduct) => {
    try {
      const response = await axiosInstance.post(
        '/admin/add_product',
        newProduct
      );

      if (response.data.productAdded) {
        fetchProducts();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpenRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleOpenLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleCloseForms = () => {
    setShowRegisterForm(false);
    setShowLoginForm(false);
    setShowPasswordResetModal(false);
    setShowResetPasswordForm(false);
  };
  function handleOpenModal() {
    setShowModal(true);
    setShowCart(false);
    handleCloseForms();
  }
  function toggleCart() {
    setShowCart(!showCart);
  }
  function handleCloseCart() {
    setShowCart(false);
  }
  const handleCloseModal = () => {
    handleCloseForms();
    setShowModal(false);
  };
  const handleOpenPassResetModal = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowPasswordResetModal(true);
  };
  const handleOpenResetPasswordForm = () => {
    setShowLoginForm(false);
    setShowPasswordResetModal(false);
    setShowRegisterForm(false);
    setShowModal(true);
    setShowResetPasswordForm(true);
  };

  const addToCart = (product, quantity = 1) => {
    const existsInCart = cartItems.find((item) => item._id === product._id);
    if (existsInCart) {
      const updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: quantity }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setCartItems(updatedCart);
  };
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const clearCart = async (user) => {
    try {
      if (cartItems.length > 0) {
        await saveCartToDatabase(user, cartItems);
      }

      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  useEffect(() => {
    if (token) {
      handleOpenResetPasswordForm();
    }
  }, [token]);
  return (
    <ShopContext.Provider
      value={{
        handleClearCart,
        showModal,
        showCart,
        handleOpenModal,
        toggleCart,
        handleCloseCart,
        handleCloseModal,
        cartItems,
        addToCart,
        removeFromCart,
        showLoginForm,
        showRegisterForm,
        handleOpenRegisterForm,
        handleOpenLoginForm,
        handleCloseForms,
        showPasswordResetModal,
        handleOpenPassResetModal,
        showResetPasswordForm,
        handleOpenResetPasswordForm,
        setShowResetPasswordForm,
        clearCart,
        products,
        loading,
        error,
        removeProduct,
        addNewProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContextProvider, ShopContext };
