/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
const ProductsPage = ({ products }) => {
  return (
    <div>
      <h1>ProductsPage</h1>
      <Link to="/">Back to home</Link>
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li style={{ border: '1px solid black', padding: '20px' }} key={product._id}>
              <img width={100} height={100} src={product.image} alt="" />
              {product.title} - -{product.category} - ${product.price}
              <br />
              <Link to={`/products/${product._id}`}>More info</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
