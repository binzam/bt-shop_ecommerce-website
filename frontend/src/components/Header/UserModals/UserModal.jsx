import { useAuthContext } from '../../../hooks/useAuthContext';
import UserProfile from './UserProfile';
import './UserModal.css';
import { Outlet } from 'react-router-dom';

const UserModal = () => {
  const { user } = useAuthContext();

  return (
    <div className="modal">
      <div className="modal_content">{user ? <UserProfile /> : <Outlet />}</div>
    </div>
  );
};

export default UserModal;
