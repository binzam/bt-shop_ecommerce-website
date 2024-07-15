import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await axios.get('http://localhost:5555/api/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (data) {
          setUsers(data.allUsers);
          setError(null);
        } else {
          setUsers([]);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    fetchUsers();
  }, [user, fetchUsers]);
  
  const removeUser = useCallback(
    async (userId) => {
      setLoading(true);
      try {
        const response = await axios.delete(
          `http://localhost:5555/api/users/remove_user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.data.userRemoved) {
          fetchUsers();
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [user, fetchUsers]
  );

  const updateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };
  return { users, error, loading, fetchUsers, removeUser, updateUsers };
};

export default useUsers;
