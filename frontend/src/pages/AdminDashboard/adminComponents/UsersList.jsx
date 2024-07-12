/* eslint-disable react/prop-types */
import { useState } from 'react';
import './users-orders.css';
import ConfirmationPopup from './ConfirmationPopup';
import Loading from '../../../components/Loading';
import useUsers from '../../../hooks/useUsers.jsx';

const UsersList = ({ user, updateUsers }) => {
  const { users, error, loading, removeUser } = useUsers(user);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleRemoveUser = (userId) => {
    setUserId(userId);
    setShowConfirmationPopup(true);
  };

  return (
    <div className="users">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="form_error">{error}</div>
      ) : (
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
      )}
      {showConfirmationPopup && (
        <ConfirmationPopup
          type="User"
          id={userId}
          remove={removeUser}
          close={setShowConfirmationPopup}
          updateUsers={updateUsers}
        />
      )}
    </div>
  );
};

export default UsersList;
