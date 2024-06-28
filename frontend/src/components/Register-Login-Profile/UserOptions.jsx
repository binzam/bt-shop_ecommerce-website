/* eslint-disable react/prop-types */
import { useAuthContext } from '../../hooks/useAuthContext';
import UserProfile from './UserProfile';
import './UserOptions.css';

const UserOptions = ({
  toggleUserModal,
  handleOpenLoginModal,
  handleOpenRegisterModal,
}) => {
  const { user } = useAuthContext();
  return (
    <div className="modal">
      <div className="modal_content">
        {!user && (
          <div className="login_signup_div">
            <button onClick={toggleUserModal} className="stay_out_btn">
              Stay signed out
            </button>
            <div className="login_signup_btns">
              <button onClick={handleOpenLoginModal} className="login_btn">
                Log In
              </button>
              <button onClick={handleOpenRegisterModal} className="signup_btn">
                Sign Up
              </button>
            </div>
          </div>
        )}
        {user && <UserProfile handleClose={toggleUserModal} />}
      </div>
    </div>
  );
};

export default UserOptions;
