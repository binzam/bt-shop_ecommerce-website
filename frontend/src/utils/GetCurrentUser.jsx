import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const GetCurrentUser = async () => {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user) {
      const getme = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5555/api/users/getme',
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(response);
          if (response.status === 200) {
            setUserData(response.data);
          }
        } catch (error) {
          console.error('Error creating order:', error);
          throw new Error('Failed to create the order. Please try again.');
        }
      };
      getme();
    }
  }, [user]);
  return userData;
};
export default GetCurrentUser;
