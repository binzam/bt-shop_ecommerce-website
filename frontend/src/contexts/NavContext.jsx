/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

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
  function handleOpenUserOptions() {
    setShowUserOptions(true);
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
    setShowUserOptions(false);
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
    setShowResetPasswordForm(false);
  };
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

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

  return (
    <NavContext.Provider
      value={{
        handleClearCart,
        showUserOptions,
        showCart,
        handleOpenUserOptions,
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
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export { NavContextProvider, NavContext };
