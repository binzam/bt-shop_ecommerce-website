import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);

  const forgotPassword = async (email) => {
    try {
      setIsResetEmailSent(false);
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.post(
        '/users/forgot_password',
        { email }
      );
      if (response.data.message) {
        setIsLoading(false);
        setIsResetEmailSent(true);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { forgotPassword, error, isLoading, isResetEmailSent };
};
