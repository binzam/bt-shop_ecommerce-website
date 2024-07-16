/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleCloseForms = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
    setShowPasswordResetModal(false);
    setShowResetPasswordForm(false);
  };
  function handleOpenUserOptions() {
    setShowUserOptions(true);
    setShowCart(false);
  }
  function toggleCart() {
    setShowCart(!showCart);
  }
  function handleCloseCart() {
    setShowCart(false);
  }
  const handleCloseModals = () => {
    setShowUserOptions(false);
  };
  const handleOpenPassResetModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowPasswordResetModal(true);
  };
  const handleOpenResetPasswordForm = () => {
    setShowLoginModal(false);
    setShowPasswordResetModal(false);
    setShowRegisterModal(false);
    setShowResetPasswordForm(true);
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
        handleCloseModals,
        cartItems,
        addToCart,
        removeFromCart,
        showLoginModal,
        showRegisterModal,
        handleOpenRegisterModal,
        handleOpenLoginModal,
        handleCloseForms,
        showPasswordResetModal,
        handleOpenPassResetModal,
        showResetPasswordForm,
        handleOpenResetPasswordForm,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export { NavContextProvider, NavContext };
