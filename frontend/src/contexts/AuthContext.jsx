/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    case 'UPDATE_SHIPPING_ADDRESS':
      return { user: { ...state.user, shippingAddress: action.payload } };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);
  const updateShippingAddress = (shippingAddress) => {
    dispatch({ type: 'UPDATE_SHIPPING_ADDRESS', payload: shippingAddress });
  };

  return (
    <AuthContext.Provider value={{ ...state, updateShippingAddress, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
