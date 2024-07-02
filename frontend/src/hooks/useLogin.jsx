import { useContext, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { handleShowProfile } = useContext(CartContext);
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5555/users/login', {
        email,
        password,
      });
      if (response.status === 200) {
        // console.log("Login successful");
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        handleShowProfile();
        dispatch({ type: 'LOGIN', payload: response.data });
      } else {
        setIsLoading(false);
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
