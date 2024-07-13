import { useState } from 'react';
import './Contact.css';
import UserIcon from '../../assets/user-name-icon.svg';
import EmailIcon from '../../assets/email-icon.svg';
import MsgIcon from '../../assets/message-icon.svg';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

function Contact() {
  const { user } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5555/api/feedback',
        { name, email, message },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data && response.data.feedbackSubmitted === true) {
        console.log('Feedback successfully submitted');
        setIsSubmitted(true);
        setError(null);
      } else {
        setIsSubmitted(false);
        setError("ERROR: NETWORK ERROR");
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message || "ERROR: NETWORK ERROR");
    }
  };

  return (
    <div className="contact-page">
      <h1 className="contact-page-header-text">Contact Us</h1>
      {isSubmitted ? (
        <div className="submit-message-container">
          <p className="submit-message">
            Dear {name},<br /> Thank you for contacting us!
            <br />{' '}
            <span>
              We will get back to you soon <br /> [{email}].
            </span>
          </p>
        </div>
      ) : (
        <div className="form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact_form_group">
              <label htmlFor="name">Name</label>
              <img src={UserIcon} alt="name" />
              <input
                className="name"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="false"
              />
            </div>
            <div className="contact_form_group">
              <label htmlFor="email">Email</label>
              <img src={EmailIcon} alt="email" />
              <input
                className="email"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="false"
              />
            </div>
            <div className="contact_form_group">
              <label htmlFor="message">Message</label>
              <img src={MsgIcon} alt="message" />

              <textarea
                id="message"
                className="message"
                placeholder="Write your thoughts..."
                value={message}
                name="message"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button className="submit-btn" type="submit">
              Submit
            </button>
            {error && <div className="form_error">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Contact;
