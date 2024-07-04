import { Link } from 'react-router-dom';
import TrendingProducts from '../../components/TrendingProducts/TrendingProducts';
import './HomePage.css';
import MensImg from '../../assets/mens-clothing-1.jpg';
import WomensImg from '../../assets/womes-clothing.jpg';
import ElectronicsImg from '../../assets/electronics-1.jpg';
import JeweleryImg from '../../assets/jewelery-1.jpg';
const Homepage = () => {
  const socialMediaLinks = [
    {
      id: 1,
      platform: 'Facebook',
      url: 'https://www.facebook.com/example',
    },
    {
      id: 2,
      platform: 'Twitter',
      url: 'https://www.twitter.com/example',
    },
    {
      id: 3,
      platform: 'Instagram',
      url: 'https://www.instagram.com/example',
    },
  ];
  return (
    <div className="home_page">
      <section id='heading' className="home_header">
        <p>Explore our wide range of products and start shopping today!</p>
      </section>
      <section className="grid_images_container">
        <div className="grid men-grid">
          <Link to={`/products/categories/${"men's clothing"}`}>
            <div className="over_lay"></div>
            <img className="men-grid-img" src={MensImg} alt="Mens-clothing" />
            <p className="grid_title">Men&apos;s Clothing</p>
          </Link>
        </div>
        <div className="grid women-grid">
          <Link to={`/products/categories/${"women's clothing"}`}>
            <div className="over_lay"></div>
            <img
              className="women-grid-img"
              src={WomensImg}
              alt="Womens-clothing"
            />
            <p className="grid_title">Women&apos;s Clothing</p>
          </Link>
        </div>
        <div className="grid etrn-grid">
          <Link to={`/products/categories/${"electronics"}`}>
            <div className="over_lay"></div>
            <img
              className="electronics-grid-img"
              src={ElectronicsImg}
              alt="Electronics"
            />
            <p className="grid_title">Electronics</p>
          </Link>
        </div>
        <div className="grid jwl-grid">
          <Link to={`/products/categories/${"jewelery"}`}>
            <div className="over_lay"></div>
            <img
              className="jewelery-grid-img"
              src={JeweleryImg}
              alt="Jewelery"
            />
            <p className="grid_title">Jewelery</p>
          </Link>
        </div>
      </section>
      <TrendingProducts />

      <div>
        <h2>Contact Information</h2>
        <p>
          If you have any questions or need assistance, feel free to reach out
          to us using the contact information below:
        </p>
        <ul>
          <li>Phone: 123-456-7890</li>
          <li>Email: info@example.com</li>
          <li>Address: 123 Main Street, City, Country</li>
        </ul>
        <div>
          <h2>Connect with Us on Social Media</h2>
          <ul>
            {socialMediaLinks.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
