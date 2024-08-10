import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axiosInstance from '../utils/axiosInstance';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/users/register', {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));

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

  return { signup, isLoading, error };
};
