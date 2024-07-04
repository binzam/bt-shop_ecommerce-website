/* eslint-disable react/prop-types */
import { useState } from 'react';
import ThumbsDownIcon from '../../assets/thumbs_down.svg';
import ThumbsUpIcon from '../../assets/thumbs_up.svg';
import './Forms.css';
import axios from 'axios';
const ProductRatingForm = ({ productId, setShowRatingForm }) => {
  const [rating, setRating] = useState(2.5);
  const [showMessage, setShowMessage] = useState(false);
  const submitRating = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/rate_product', {
        _id: productId,
        rating,
      });

      const data = response.data;

      if (data.rateSubmited) {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setShowRatingForm(false);
        }, 2000);
      } else {
        throw new Error('Rating insertion failed.');
      }
    } catch (error) {
      console.error(error);
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
      </form>
      {showMessage && (
        <div className="after_rating">Thank you for your feedback!</div>
      )}
    </>
  );
};

export default ProductRatingForm;
