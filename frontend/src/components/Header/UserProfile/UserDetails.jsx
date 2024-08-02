import { useContext, useState } from 'react';
import Avatar from '../../../assets/avatar.svg';
// import PlusIcon from '../../../assets/icon-plus.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../../contexts/ShopContext';
import UploadIcon from '../../../assets/upload-solid.svg';
import Loading from '../../Loading';
import { useAuthContext } from '../../../hooks/useAuthContext';

const UserDetails = () => {
  const { user, updateProfilePicture } = useAuthContext();
  const { handleCloseModal } = useContext(ShopContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const handleToggleUploadImage = () => {
    setUploadImage(!uploadImage);
  };
  const handleImageChange = (e) => {
    console.log(e.target.files);
    setProfilePicture(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
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
      console.log(response);
      if (response.data.profilePictureUpdated) {
        updateProfilePicture(response.data.profilePicture);
        setProfilePicture(response.data.profilePicture);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Invalid file type.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(profilePicture);
  return (
    <div className="user_info">
      {user.role === 'admin' && <span className="admin_title"> ADMIN</span>}
      <div className="user_profile_info">
        <div className="profile_options">
          <div className="user_profile_pic" onClick={handleToggleUploadImage}>
            <img
              src={
                previewImage || profilePicture || user.profilePicture || Avatar
              }
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
