import { useContext, useState } from 'react';
import { useResetPassword } from '../../hooks/useResetPassword';
import Loading from '../Loading';
import closeIcon from '../../assets/close_btn.svg';
import { NavContext } from '../../contexts/NavContext';

const ResetPassword = () => {
  const { handleCloseModal } = useContext(NavContext);
  const [email, setEmail] = useState('');
  const { error, isLoading, resetPassword, isResetEmailSent } =
    useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      console.log('Please enter your email');
      return;
    }
    await resetPassword(email);
  };

  return (
    <>
      <div onClick={handleCloseModal} className="close_popup_icon">
        <img src={closeIcon} alt="close login form" />
      </div>
      {isLoading && <Loading />}
      {!isResetEmailSent ? (
        <form className="reset_password_form" onSubmit={handleSubmit}>
          <h2 className="login_txt">Reset Password</h2>
          <div className="login_form_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="false"
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="reset_pass_form_btn">
            Send Password Reset Email
          </button>
          {error && <div className="form_error">{error}</div>}
        </form>
      ) : (
        <div className="reset_email_sent">
          <h2>Email sent</h2>
          <p>
            An email containing a link to{' '}
            <strong className="highlight"> Reset your Password </strong>
            has been sent to your email. <br /> Please check your email and
            follow the instructions
          </p>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
