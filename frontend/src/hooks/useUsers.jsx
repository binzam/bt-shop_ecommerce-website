import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axiosInstance from '../utils/axiosInstance';

const useUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await axiosInstance.get('/admin/users');

        if (data) {
          setUsers(data.allUsers);
          setUsersError(null);
        } else {
          setUsers([]);
        }
      }
    } catch (error) {
      setUsersError(error.message);
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
        const response = await axiosInstance.delete(
          `/admin/remove_user/${userId}`
        );
        if (response.data.userRemoved) {
          fetchUsers();
        }
      } catch (error) {
        setUsersError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [ fetchUsers]
  );

  const updateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };
  return { users, usersError, loading, fetchUsers, removeUser, updateUsers };
};

export default useUsers;
