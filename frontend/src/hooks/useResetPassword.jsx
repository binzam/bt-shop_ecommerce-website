import { useContext, useState } from 'react';
import axios from 'axios';
import { NavContext } from '../contexts/NavContext';

export const useResetPassword = () => {
  const { handleOpenResetPasswordForm } = useContext(NavContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const resetPassword = async (email) => {
    try {
      setIsResetEmailSent(false);
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        'http://localhost:5555/api/users/forgot_password',
        { email }
      );
      if (response && response.data.emailSent) {
        setIsLoading(false);
        handleOpenResetPasswordForm();
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, error, isLoading, isResetEmailSent };
};
