import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:5555/api/users/reset_password',
        { email }
      );
      if(response){
          setIsLoading(false);
          console.log(response);

      }
      if(response.data.user.role === "admin"){
        navigate('/admin')
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, error, isLoading };
};
