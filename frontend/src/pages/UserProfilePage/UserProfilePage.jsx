import { Link, useParams } from 'react-router-dom';
import './UserProfilePage.css';
import useUsers from '../../hooks/useUsers';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Arrow from '../../assets/arrow-left.svg';
import UserIcon from '../../assets/avatar.svg';
import ArrowDown from '../../assets/arrow-down-solid.svg';
import RemoveIcon from '../../assets/icon-remove.svg';
import { useEffect, useState } from 'react';
import { getUserById } from '../../utils/userUtils';
import { useAuthContext } from '../../hooks/useAuthContext';
import ConfirmationPopup from '../AdminDashboard/adminComponents/ConfirmationPopup';
import OrderCard from '../../components/OrderCard/OrderCard';

const UserProfilePage = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { removeUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleRemoveUser = (userId) => {
    setUserId(userId);
    setShowConfirmationPopup(true);
  };
  useEffect(() => {
    if (user) {
      getUserById(user, id, setSelectedUser, setError, setIsLoading);
    }
  }, [user, id]);
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const {
    username,
    profilePicture,
    email,
    createdAt,
    orders = [],
  } = selectedUser;
  return (
    <div className="user_profile_page">
      <Link className="back_btn" to="/admin">
        <img src={Arrow} alt="back button" />
        Back
      </Link>
      <div className="user_description">
        <div className="user_description_header">
          <div className="user_image_div">
            <img src={profilePicture || UserIcon} alt="profile picture" />
          </div>
          <div className="user_details_wrapper">
            <div className="user_details">
              <div className="user_joined">
                Joined:{' '}
                <small className="highlight">
                  {new Date(createdAt).toUTCString()}
                </small>
              </div>
              <h2 className="user_detail_name">{username}</h2>
              <small className="highlight">{email}</small>
              <div className="users_orders">
                Orders Issued<span className="orange">{orders.length}</span>{' '}
              </div>
              <img src={ArrowDown} alt="arrow down" />
            </div>

            {user.role === 'user' && (
              <button
                onClick={() => handleRemoveUser(id)}
                className="remove_user_btn"
              >
                Remove User
                <img src={RemoveIcon} alt="remove user" />
              </button>
            )}
          </div>
        </div>

        <div className="orders_list">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
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

export default UserProfilePage;
