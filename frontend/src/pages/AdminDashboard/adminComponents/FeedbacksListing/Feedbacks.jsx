import { useContext, useEffect, useState } from 'react';
import Loading from '../../../../components/Loading';
import ConfirmationPopup from '../ConfirmationPopup';
import { AuthContext } from '../../../../contexts/AuthContext';
import axios from 'axios';

const Feedbacks = () => {
  const { user } = useContext(AuthContext);

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [feedbackId, setFeedbackId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  console.log(feedbacks);
  const handleRemoveFeedback = (userId) => {
    setFeedbackId(userId);
    setShowConfirmationPopup(true);
  };
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await axios.get(
          'http://localhost:5555/api/admin/feedbacks',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (data) {
          setFeedbacks(data.allFeedbacks);
          setError(null);
        } else {
          setFeedbacks([]);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const removeFeedback = async (feedbackId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5555/api/admin/remove_feedback/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data.feedbackRemoved) {
        fetchFeedbacks();
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedbacks">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="form_error">{error}</div>
      ) : (
        <>
          <ul className="users_list">
            {feedbacks &&
              feedbacks.map((user) => (
                <li key={user._id} className="user">
                  <div className="user_detail">
                    Name: <span className="highlight">{user.name}</span>
                  </div>
                  <div className="user_detail">
                    Name: <span>{user.email}</span>
                  </div>
                  <div className="user_detail">
                    Email: <span className="highlight">{user.message}</span>
                  </div>

                  <button
                    className="remove_user_btn"
                    onClick={() => handleRemoveFeedback(user._id)}
                  >
                    Remove feedback
                  </button>
                </li>
              ))}
          </ul>
        </>
      )}
      {showConfirmationPopup && (
        <ConfirmationPopup
          type="Feedback"
          id={feedbackId}
          remove={removeFeedback}
          close={setShowConfirmationPopup}
        />
      )}
    </div>
  );
};

export default Feedbacks;
