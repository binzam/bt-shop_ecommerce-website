import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5555/api/users/login',
        {
          email,
          password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setLoginSuccess(true);
        localStorage.setItem(
          'userInfo',
          JSON.stringify(response.data.userData)
        );
        localStorage.setItem('cart', JSON.stringify(response.data.cartData));
        dispatch({ type: 'LOGIN', payload: response.data.userData });
        if (response.data.userData.role === 'admin') {
          navigate('/admin');
        }
      } 
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, loginSuccess };
};
