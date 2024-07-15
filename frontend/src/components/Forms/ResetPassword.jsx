/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useResetPassword } from '../../hooks/useResetPassword';
import Loading from '../Loading';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword, error, isLoading } = useResetPassword();

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
      {isLoading && <Loading />}

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
          Reset Password
        </button>
        {error && <div className="form_error">{error}</div>}
      </form>
    </>
  );
};

export default ResetPassword;
