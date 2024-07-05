/* eslint-disable react/prop-types */
import { useState } from 'react';
import ThumbsDownIcon from '../../assets/thumbs_down.svg';
import ThumbsUpIcon from '../../assets/thumbs_up.svg';
import './Forms.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
const ProductRatingForm = ({ productId, setShowRatingForm }) => {
  const { user } = useAuthContext();
  const [rating, setRating] = useState(2.5);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState(null);
  const submitRating = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5555/products/rate_product',
        {
          productId,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = response.data;

      if (data.rateSubmited) {
        setShowMessage(true);
        setError(null);

        setTimeout(() => {
          setShowMessage(false);
          setShowRatingForm(false);
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={submitRating}
        className={`product_rating_form ${showMessage ? 'rated' : ''}`}
      >
        <label htmlFor="prd_rating">Rating: {rating || '2.5'} / 5</label>
        <div className="rating_input">
          <img className="thumbs_down" src={ThumbsDownIcon} alt="thumbs down" />
          <input
            id="prd_rating"
            className="rating_range"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={rating || '2.5'}
            onChange={handleChange}
          />
          <img className="thumbs_up" src={ThumbsUpIcon} alt="thumbs up" />
        </div>
        <button className="submit_rate_btn" type="submit">
          Submit
        </button>
        {error && <div className="form_error">{error}</div>}
      </form>
      {showMessage && (
        <div className="after_rating">Thank you for your feedback!</div>
      )}
    </>
  );
};

export default ProductRatingForm;
