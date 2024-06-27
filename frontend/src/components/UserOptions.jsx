/* eslint-disable react/prop-types */
import UserProfile from "./UserProfile";

const UserOptions = ({
  toggleUserPopup,
  handleOpenLoginModal,
  handleOpenRegisterModal,
  isLoggedIn,
  userInfo,
}) => {
  return (
    <div className="modal">
      {!isLoggedIn && (
        <div className="login_signup_div">
          <button onClick={toggleUserPopup} className="stay_out_btn">
            Stay signed out
          </button>
          <div className="login_signup_header">
            <p className="signup_txt">You are NOT signed in</p>
          </div>
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
      {isLoggedIn && (
         <UserProfile
         handleClose={toggleUserPopup}
         userInfo={userInfo}
       />
      )}
    </div>
  );
};

export default UserOptions;
