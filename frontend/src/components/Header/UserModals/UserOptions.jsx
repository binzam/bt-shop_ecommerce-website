import { useAuthContext } from '../../../hooks/useAuthContext';
import UserProfile from './UserProfile';
import './UserOptions.css';
import { Outlet } from 'react-router-dom';

const UserOptions = () => {
  const { user } = useAuthContext();

  return (
    <div className="modal">
      <div className="modal_content">{user ? <UserProfile /> : <Outlet />}</div>
    </div>
  );
};

export default UserOptions;
