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

  const isAdmin = () => {
    if(state.user){
      return state.user.role === 'admin' ? true : false;
    }
  };
  const isLoggedIn = () => {
    return state.user !== null;
  };
  return (
    <AuthContext.Provider value={{ ...state, dispatch, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
