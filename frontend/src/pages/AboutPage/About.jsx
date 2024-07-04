import './About.css';

function About() {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div className="page-content">
        <div className="top">
          <div className="filter"></div>
          <div className="top-text">
            <h2>Who are we?</h2>
            <p>
              Hello and welcome to bt-shop, the place to find the best clothing,
              accessories and electronics for every taste and occasion. We
              thoroughly check the quality of our goods, working only with
              reliable suppliers so that you only receive the best quality
              product. We at bt-shop believe in high quality and exceptional
              customer service. But most importantly, we believe shopping is a
              right, not a luxury, so we strive to deliver the best products at
              the most affordable prices, and ship them to you regardless of
              where you are located.
            </p>
          </div>
        </div>
        <div className="bottom">
          <div className="filter"></div>
          <div className="bottom-text">
            <h2>What do we offer?</h2>
            <p>
              At bt-shop, our aim is to offer you fine products that show you
              that we really care! Not only have we got the trendiest products,
              but we can also guarantee that they are of the finest quality. We
              started as a small business, and our aim is to continue providing
              our customers with products that keep them happy, at prices that
              keep them happy. Our customers are our top priority and through
              our products we work hard towards building long-lasting and
              meaningful relations with them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
