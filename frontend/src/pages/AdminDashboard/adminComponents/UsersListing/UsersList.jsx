import Loading from '../../../../components/Loading.jsx';
import UserCard from '../../../../components/UserCard/UserCard.jsx';
import useUsers from '../../../../hooks/useUsers.jsx';
import './UsersList.css';
const UsersList = () => {
  const { users, usersError, loading } = useUsers();
  if (usersError) {
    return <div className="form_error">{usersError}</div>;
  }
  return (
    <div className="users">
      {loading && <Loading />}
      <span className="counter">Registered Users: {users.length}</span>
      <div className="users_list">
        {users && users.map((user) => <UserCard key={user._id} user={user} />)}
      </div>
    </div>
  );
};

export default UsersList;
