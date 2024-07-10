/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';
import './users-orders.css';
import ConfirmationPopup from './ConfirmationPopup';

const UsersList = ({ setUsersCount }) => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get('http://localhost:5555/api/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data;
      setUsers(data.allUsers);
      setUsersCount(data.userCount);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  }, [user, setUsersCount]);
  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, fetchUsers]);
  const handleRemoveUser = (userId) => {
    setUserId(userId);
    setShowConfirmationPopup(true);
  };
  const removeUser = async (userId) => {
    setShowConfirmationPopup(false);
    setError(null);
    axios
      .delete(`http://localhost:5555/api/users/remove_user/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        if (response.data.userRemoveSuccess) {
          setError(null);
        }
        fetchUsers();
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="users">
      {showConfirmationPopup && (
        <ConfirmationPopup
          type="User"
          id={userId}
          remove={removeUser}
          close={setShowConfirmationPopup}
        />
      )}
      {error && <div className="form_error">{error}</div>}
      <ul className="users_list">
        {users &&
          users.map((user) => (
            <li key={user._id} className="user">
              <div>
                ID: <span className="highlight">{user._id}</span>
              </div>
              <div>
                Name: <span>{user.username}</span>
              </div>
              <div>
                Email: <span className="highlight">{user.email}</span>
              </div>
              <div>
                Role: <span>{user.role}</span>
              </div>
              {user.role !== 'admin' && (
                <button
                  className="remove_user_btn"
                  onClick={() => handleRemoveUser(user._id)}
                >
                  Remove user
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UsersList;
