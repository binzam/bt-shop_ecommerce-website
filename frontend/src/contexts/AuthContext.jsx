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
    case 'UPDATE_PROFILE_PICTURE':
      return { user: { ...state.user, profilePicture: action.payload } };
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
    if (state.user) {
      return state.user.role === 'admin' ? true : false;
    }
  };
  const isLoggedIn = () => {
    return state.user !== null;
  };

  const updateProfilePicture = (newProfilePicture) => {
    dispatch({ type: 'UPDATE_PROFILE_PICTURE', payload: newProfilePicture });
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ ...state.user, profilePicture: newProfilePicture })
    );
  };

 
  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        isAdmin,
        isLoggedIn,
        updateProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
