import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const useResetPassword = () => {
  const [resetError, setResetError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  const resetPassword = async (token, newPassword) => {
    setIsLoading(true);
    setResetError(null);
    setIsResetSuccessful(false);
    try {
      const response = await axiosInstance.post('/users/reset_password', {
        token,
        newPassword,
      });
      console.log(response);
      if (response.data.resetPasswordSuccess) {
        setResetError(null);
        setIsResetSuccessful(true);
      }
    } catch (error) {
      console.log(error);
      setResetError(error.response.data.error || 'Reset email has expired');
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading, resetError, isResetSuccessful };
};
