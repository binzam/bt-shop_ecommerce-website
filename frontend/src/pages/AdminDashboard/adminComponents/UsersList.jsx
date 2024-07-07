/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';

const UsersList = ({ setUsersCount }) => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [removeSuccessMessage, setRemoveSuccessMessage] = useState(null);
  const handleRemoveUser = async (userId) => {
    setRemoveSuccessMessage(null);
    try {
      const response = await axios.delete(
        `http://localhost:5555/api/users/remove_user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data.userRemoveSuccess) {
        setRemoveSuccessMessage(response.data.message);
      }
    } catch (error) {
      setRemoveSuccessMessage(null);
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.data.data;
        setUsersCount(response.data.userCount);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchUsers();
    }
  }, [user, setUsersCount]);
  return (
    <div className="users">
      <ul className="users_list">
        {users &&
          users.map((user) => (
            <li key={user._id} className="user">
              <div>ID: [ {user._id} ]</div>
              <div>Name: [ {user.username} ]</div>
              <div>Email: [ {user.email} ]</div>
              <div>Role: [ {user.role} ]</div>
              {user.role !== 'admin' && (
                <button
                  className="remove_user_btn"
                  onClick={() => handleRemoveUser(user._id)}
                >
                  Remove user
                </button>
              )}
              {removeSuccessMessage && <div>{removeSuccessMessage}</div>}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UsersList;
