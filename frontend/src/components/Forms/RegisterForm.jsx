import { useContext, useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import closeIcon from '../../assets/close_btn.svg';
import './Forms.css';
import Loading from '../Loading';
import { ShopContext } from '../../contexts/ShopContext';

const RegisterForm = () => {
  const { handleCloseForms } = useContext(ShopContext);
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { firstName, lastName, email, password, confirmPassword } =
    registerForm;
  const { signup, error, isLoading } = useSignup();

  //   console.log(registerForm);
  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await signup(email, password, firstName, lastName);
  };
  return (
    <>
      <button onClick={handleCloseForms} className="close_popup_icon">
        <img src={closeIcon} alt="close login form" />
      </button>
      {isLoading && <Loading />}
      <form className="register_form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <div className="signup_form_group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={handleChange}
            required
            autoComplete="false"
          />
        </div>
        <div className="signup_form_group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={handleChange}
            required
            autoComplete="false"
          />
        </div>
        <div className="signup_form_group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email account"
            value={email}
            onChange={handleChange}
            required
            autoComplete="false"
          />
        </div>
        <div className="signup_form_group">
          <label htmlFor="createPassword">Create password</label>
          <input
            type="password"
            id="createPassword"
            name="password"
            placeholder="Create password"
            value={password}
            onChange={handleChange}
            required
            autoComplete="false"
          />
        </div>
        <div className="signup_form_group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Create password"
            value={confirmPassword}
            onChange={handleChange}
            required
            autoComplete="false"
          />
        </div>

        <button type="submit" disabled={isLoading} className="signup_form_btn">
          Register
        </button>
        {error && <div className="form_error">{error}</div>}
      </form>
    </>
  );
};

export default RegisterForm;
