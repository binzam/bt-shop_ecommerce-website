/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './UserCard.css';
const UserCard = ({ user }) => {
  return (
    <article className="user">
      <div className="user_detail_picture">
        <img src={user.profilePicture} alt="user profile picture" />
      </div>
      <div className="user_detail_name">{user.username}</div>
      <div className="user_detail_id">ID: {user._id}</div>
      <div className="user_detail_email">{user.email}</div>

      <Link className="view_profile_link" to={`/users/${user._id}`}>
        view profile
      </Link>
    </article>
  );
};

export default UserCard;
