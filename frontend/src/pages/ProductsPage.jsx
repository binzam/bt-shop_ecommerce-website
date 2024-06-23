import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5555/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data);
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>ProductsPage</h1>
      <Link to="/">Back to home</Link>
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <img width={100} height={100} src={product.image} alt="" />
              {product.title} -
               -{product.category} - $
              {product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
