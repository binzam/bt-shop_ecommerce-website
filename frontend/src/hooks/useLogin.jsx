import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
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
      if (response.status === 200) {
        // console.log("Login successful");
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        dispatch({ type: 'LOGIN', payload: response.data });
        if (response.data.role === 'admin') {
          navigate('/admin');
        }
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
