import { Link } from 'react-router-dom';
import './Footer.css';
const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer_content">
        <p>&copy; {new Date().getFullYear()} bt-shop </p>
        <ul className="footer_links">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
