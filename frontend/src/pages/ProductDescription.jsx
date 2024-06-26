/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDescription = ({ products }) => {
  const { id } = useParams();
  const [productToView, setProductToView] = useState([]);
  const selectedProduct = products.find((prd) => prd._id === id);
  useEffect(() => {
    if (selectedProduct) {
      setProductToView(selectedProduct);
    }
  }, [id, productToView, selectedProduct]);
  const { image, title, price, description } = productToView;
  console.log(productToView);
  console.log(selectedProduct);

  return (
    <div>
      <h1>ProductDescription</h1>
      <Link to="/products">Back</Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img style={{ width: '100px' }} src={image} alt="" />
        </div>
        <div>
          <h2>{title}</h2>
          <strong>${price}</strong>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
