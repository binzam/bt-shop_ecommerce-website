import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5555/users/register',
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      console.log(response);
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
