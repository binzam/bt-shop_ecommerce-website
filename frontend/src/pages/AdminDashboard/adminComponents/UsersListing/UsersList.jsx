/* eslint-disable react/prop-types */
import { useState } from 'react';
import './UsersList.css';
import ConfirmationPopup from '../ConfirmationPopup.jsx';
import Loading from '../../../../components/Loading.jsx';
import useUsers from '../../../../hooks/useUsers.jsx';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const { users, usersError, loading, removeUser } = useUsers();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log(users);
  const handleRemoveUser = (userId) => {
    setUserId(userId);
    setShowConfirmationPopup(true);
  };
  console.log(users);
  return (
    <div className="users">
      {loading ? (
        <Loading />
      ) : usersError ? (
        <div className="form_error">{usersError}</div>
      ) : (
        <>
          <div className="counter">Registered Users: {users.length}</div>
          <div className="users_list">
            {users &&
              users.map((user) => (
                <article key={user._id} className="user">
                  <div className="user_detail_picture">
                    <img src={user.profilePicture} alt="user profile picture" />
                  </div>
                  <div className="user_detail">
                    ID: <span className="highlight">{user._id}</span>
                  </div>
                  <div className="user_detail">
                    <span>{user.username}</span>
                  </div>
                  <div className="user_detail">
                    <span className="highlight">{user.email}</span>
                  </div>

                  <Link className='view_profile_link' to={`/users/${user._id}`}>view profile</Link>

                  {user.role !== 'admin' && (
                    <button
                      className="remove_user_btn"
                      onClick={() => handleRemoveUser(user._id)}
                    >
                      Remove user
                    </button>
                  )}
                </article>
              ))}
          </div>
        </>
      )}
      {showConfirmationPopup && (
        <ConfirmationPopup
          type="User"
          id={userId}
          remove={removeUser}
          close={setShowConfirmationPopup}
        />
      )}
    </div>
  );
};

export default UsersList;
