import { useContext, useState } from 'react';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import Loading from '../Loading';
import closeIcon from '../../assets/close_btn.svg';
import { ShopContext } from '../../contexts/ShopContext';
import CheckMarkIcon from '../../assets/check-solid.svg';
import './Forms.css';

const ForgotPasswordForm = () => {
  const { handleCloseModal } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const { error, isLoading, forgotPassword, isResetEmailSent } =
    useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      console.log('Please enter your email');
      return;
    }
    await forgotPassword(email);
  };

  return (
    <>
      <button onClick={handleCloseModal} className="close_modal">
        <img src={closeIcon} alt="close login form" />
      </button>
      {isLoading && <Loading />}
      {!isResetEmailSent ? (
        <form className="reset_password_form" onSubmit={handleSubmit}>
          <h2 className="login_txt">Forgot Password</h2>
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
            Send Reset Instructions
          </button>

          {error && <div className="form_error">{error}</div>}
        </form>
      ) : (
        <div className="reset_email_sent">
          <div className="check_mark_img">
            <img src={CheckMarkIcon} alt="check mark" />
          </div>
          <h2>Email sent </h2>

          <p>
            A<strong className="highlight"> Password Reset Email </strong>
            A has been sent to your registered email address. <br /> Please
            check your email and follow the instructions.
          </p>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
