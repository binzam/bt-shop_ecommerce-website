import { useState } from 'react';
import axios from 'axios';

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);

  const forgotPassword = async (email) => {
    try {
      setIsResetEmailSent(false);
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        'http://localhost:5555/api/users/forgot_password',
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
