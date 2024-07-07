import { Link } from 'react-router-dom';
import TrendingProducts from '../../components/TrendingProducts/TrendingProducts';
import './HomePage.css';
import MensImg from '../../assets/mens-clothing-1.jpg';
import WomensImg from '../../assets/womes-clothing.jpg';
import ElectronicsImg from '../../assets/electronics-1.jpg';
import JeweleryImg from '../../assets/jewelery-1.jpg';
const Homepage = () => {
  return (
    <div className="home_page">
      <section id="heading" className="home_header">
        <p>Explore our wide range of products and start shopping today!</p>
      </section>
      <section className="grid_images_container">
        <div className="grid men-grid">
          <Link to={`/products/categories/${"men's clothing"}`}>
            <div className="over_lay"></div>
            <img className="men-grid-img" src={MensImg} alt="Mens-clothing" />
            <p className="grid_title">
              Men&apos;s <br /> Clothing
            </p>
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
            <p className="grid_title">
              Women&apos;s
              <br /> Clothing
            </p>
          </Link>
        </div>
        <div className="grid etrn-grid">
          <Link to={`/products/categories/${'electronics'}`}>
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
          <Link to={`/products/categories/${'jewelery'}`}>
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
      <div className="home_category_section">
        <h2 className="category_header">Categories</h2>
        <ul className="home_page_category_list">
          <li>
            <Link className="category_link" to="/products">
              All Products
            </Link>
          </li>
          <li>
            <Link
              className="category_link"
              to={`/products/categories/${"men's clothing"}`}
            >
              Men&apos;s
            </Link>
          </li>
          <li>
            <Link
              className="category_link"
              to={`/products/categories/${"women's clothing"}`}
            >
              Women&apos;s
            </Link>
          </li>
          <li>
            <Link
              className="category_link"
              to={`/products/categories/${'electronics'}`}
            >
              Electronics
            </Link>
          </li>
          <li>
            <Link
              className="category_link"
              to={`/products/categories/${'jewelery'}`}
            >
              Jewelery
            </Link>
          </li>
        </ul>
      </div>
      <div className="contact_info">
        <h2>Contact Information</h2>
        <p className="contact_txt">
          If you have any questions or need assistance, feel free to reach out
          to us using the contact information below:
        </p>
        <ul>
          <li>
            <strong>Phone:</strong> 123-456-7890
          </li>
          <li>
            <strong>Email:</strong> info@example.com
          </li>
          <li>
            <strong>Address:</strong> 123 Main Street, City, Country
          </li>
        </ul>
        <div>
          <ul className="social_links">
            <li>
              <i className="fa-brands fa-facebook"></i>
              <a
                className="social_link"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
            <li>
              <i className="fa-brands fa-instagram"></i>
              <a
                className="social_link"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
            <li>
              <i className="fa-brands fa-x-twitter"></i>
              <a
                className="social_link"
                href="https://www.x.com/"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
