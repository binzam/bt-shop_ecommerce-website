/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import Avatar from '../../../assets/avatar.svg';
// import PlusIcon from '../../../assets/icon-plus.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavContext } from '../../../contexts/NavContext';
import UploadIcon from '../../../assets/upload-solid.svg';
import Loading from '../../Loading';

const UserDetails = ({ user }) => {
  const { handleCloseModal } = useContext(NavContext);
  const [profilePicture, setProfilePicture] = useState('');
  const [uploadImage, setUploadImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleToggleUploadImage = () => {
    setUploadImage(!uploadImage);
  };
  const handleImageChange = (e) => {
    console.log(e.target.files);
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      console.log(formData);
      const response = await axios.post(
        'http://localhost:5555/api/users/upload_image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log("Login successful");
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        console.log(response);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="user_info">
      {user.role === 'admin' && <span className="admin_title"> ADMIN</span>}
      <div className="user_profile_info">
        <div className="profile_options">
          <div className="user_profile_pic" onClick={handleToggleUploadImage}>
            <img
              src={user.profilePicture ? user.profilePicture : Avatar}
              alt="profile picture"
            />
          </div>
          {uploadImage && (
            <div className="upload_image_option">
              <form className="upload_image_form" onSubmit={handleSubmit}>
                <label htmlFor="uploadImage" className="select_image">
                  Select Image
                </label>
                <input
                  id="uploadImage"
                  type="file"
                  onChange={handleImageChange}
                />
                <button
                  className="upload_image_btn"
                  type="submit"
                  disabled={isLoading}
                >
                  <img src={UploadIcon} alt="upload" />
                  {isLoading ? 'Uploading...' : 'Upload'}
                </button>
                {isLoading && <Loading />}
                {error && <div className="form_error">Error: {error}</div>}
              </form>
            </div>
          )}
        </div>
        <div className="user_cred">
          <div className="profile_txts">
            <strong>{user.username}</strong>
          </div>
          <div className="profile_txts">
            <strong>{user.email}</strong>
          </div>

          {user.role !== 'admin' && (
            <Link
              onClick={handleCloseModal}
              to="/orders"
              className="view_orders_btn"
            >
              View your orders
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
