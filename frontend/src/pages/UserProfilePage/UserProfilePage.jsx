import { Link, useParams } from 'react-router-dom';
import './UserProfilePage.css';
import useUsers from '../../hooks/useUsers';
// import { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Arrow from '../../assets/arrow-left.svg';
import UserIcon from '../../assets/avatar.svg';
import RemoveIcon from '../../assets/icon-remove.svg';
import { useEffect, useState } from 'react';
import { getUserById } from '../../utils/userUtils';
import { useAuthContext } from '../../hooks/useAuthContext';

const UserProfilePage = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { removeUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (user) {
      getUserById(user, id, setSelectedUser, setError, setIsLoading);
    }
  }, [user, id]);
//   const { username, profilePicture, email } = selectedUser;selectedUser.
  const handleRemoveUser = (userId) => {
    removeUser(userId);
  };
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  console.log(selectedUser);
  console.log(typeof selectedUser);
  
  const { username, profilePicture, email, createdAt, orders = [] } = selectedUser;
  return (
    <div className="user_profile_page">
      <Link className="back_btn" to="/admin">
        <img src={Arrow} alt="back button" />
        Back
      </Link>
      <div className="user_description">
        <div className="user_image_div">
          <img src={profilePicture || UserIcon} alt="profile picture" />
        </div>

        <div className="user_details">
          <div className="">Joined: <small>{new Date(createdAt).toUTCString()}</small></div>
          <h2 className="user_name">{username}</h2>
          <strong className="user_email">{email}</strong>

          <div>
          <div className="">
            {orders.map((order) => (
              <div key={order._id} className="order_item">
                <div className="order_details">
                  <p>Order ID: {order._id}</p>
                  <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                  <p>Payment Method: {order.paymentMethod}</p>
                  <p>Payment Status: {order.paymentStatus}</p>
                  <p>Order Status: {order.orderStatus}</p>
                  <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="order_items">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="order_item_details">
                      <img src={item.image} alt={item.title} />
                      <div>
                        <p>{item.title}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Tax: ${item.tax.toFixed(2)}</p>
                        <p>Total: ${item.totalItemPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
          <button
            onClick={() => handleRemoveUser(id)}
            className="remove_user_btn"
          >
            Remove User
            <img src={RemoveIcon} alt="remove user" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
