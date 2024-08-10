import { useCallback, useContext, useEffect, useState } from 'react';
import Loading from '../../../../components/Loading';
import ConfirmationPopup from '../ConfirmationPopup';
import { AuthContext } from '../../../../contexts/AuthContext';
import axiosInstance from '../../../../utils/axiosInstance';

const Feedbacks = () => {
  const { user } = useContext(AuthContext);

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [feedbackId, setFeedbackId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const handleRemoveFeedback = (userId) => {
    setFeedbackId(userId);
    setShowConfirmationPopup(true);
  };
  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await axiosInstance.get('/admin/feedbacks');
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
  }, [user]);
  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const removeFeedback = async (feedbackId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/admin/remove_feedback/${feedbackId}`,
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
                    Email: <span>{user.email}</span>
                  </div>
                  <div className="user_detail">
                    Message: <span className="highlight">{user.message}</span>
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
