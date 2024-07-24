import { useContext, useState } from 'react';
import UpdatePassword from '../../Forms/UpdatePassword';
import { useLogout } from '../../../hooks/useLogout';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { NavContext } from '../../../contexts/NavContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../../../assets/avatar.svg';
import closeIcon from '../../../assets/close_btn.svg';
import GearIcon from '../../../assets/gear-solid.svg';
import SignoutIcon from '../../../assets/sign-out.svg';
import './UserProfile.css';
import ShippingForm from '../../Forms/ShippingForm';
import PaymentForm from '../../Forms/PaymentForm';
import PlusIcon from '../../../assets/icon-plus.svg';

const UserProfile = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { handleCloseModal, handleClearCart } = useContext(NavContext);
  const [showUpdatePassForm, setShowUpdatePassForm] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showUpdateShippingForm, setShowUpdateShippingForm] = useState(false);
  const [showUpdatePaymentForm, setShowUpdatePaymentForm] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [uploadImage, setUploadImage] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setShowUpdatePassForm(false);
    setShowUpdateShippingForm(false);
    setShowUpdatePaymentForm(false);
  };
  const handleOpenChangePassword = () => {
    setShowUpdatePassForm(true);
    setShowUpdateShippingForm(false);
    setShowUpdatePaymentForm(false);
  };

  const handleOpenUpdateShipping = () => {
    setShowUpdateShippingForm(true);
    setShowUpdatePassForm(false);
    setShowUpdatePaymentForm(false);
  };

  const handleOpenUpdatePayment = () => {
    setShowUpdatePaymentForm(true);
    setShowUpdatePassForm(false);
    setShowUpdateShippingForm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
    handleClearCart();
    handleCloseModal();
  };
  const handleShowUploadImage = () => {
    setUploadImage(true);
  };
  const handleHideUploadImage = () => {
    setUploadImage(false);
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    setProfilePicture(e.target.files[0]);
  };

  const handleUpload = async () => {
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
      // setProfilePicture(null);
      setError(null);
    } catch (error) {
      setError('Error uploading profile picture. Please try again.');
    }
  };
  return (
    <div className="user_profile">
      {error && <div className="form_error">{error}</div>}

      <Link to="/home" onClick={handleCloseModal} className="close_popup_icon">
        <img src={closeIcon} alt="close profile" />
      </Link>
      <div className="user_info">
        {user.role === 'admin' && <span className="admin_title"> ADMIN</span>}
        <div className="user_profile_info">
          <div className="profile_options">
            <div className="user_profile_pic" onClick={handleShowUploadImage}>
              <img
                src={
                  profilePicture ? URL.createObjectURL(profilePicture) : Avatar
                }
                alt="profile picture"
              />
            </div>
            {uploadImage && (
              <div className="upload_image_option">
                <div
                  onClick={handleHideUploadImage}
                  // className="close_popup_icon"
                >
                  <img src={closeIcon} alt="close profile" />
                </div>
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/"
                  onChange={handleFileChange}
                />
                <button onClick={handleUpload} className="upload_image_btn">
                  Upload
                  <img
                    title="Upload Profile Picture"
                    src={PlusIcon}
                    alt="Upload image"
                  />
                </button>
              </div>
            )}
          </div>
          <div>
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
      <div className="account_settings">
        <button
          className="settings_btn"
          onClick={isSettingsOpen ? handleCloseSettings : handleOpenSettings}
        >
          <img src={GearIcon} alt="Settings" />
          Account Settings
        </button>

        {isSettingsOpen && (
          <div className="settings-dropdown">
            <div
              className="change_pass_btn"
              onClick={
                showUpdatePassForm
                  ? () => setShowUpdatePassForm(false)
                  : handleOpenChangePassword
              }
            >
              Change Password
            </div>
            {showUpdatePassForm && <UpdatePassword />}
            <div
              className="update_shipping_btn"
              onClick={
                showUpdateShippingForm
                  ? () => setShowUpdateShippingForm(false)
                  : handleOpenUpdateShipping
              }
            >
              Update Shipping Address
            </div>
            {showUpdateShippingForm && <ShippingForm />}
            <div
              className="update_payment_btn"
              onClick={
                showUpdatePaymentForm
                  ? () => setShowUpdatePaymentForm(false)
                  : handleOpenUpdatePayment
              }
            >
              Update Payment Info
            </div>
            {showUpdatePaymentForm && <PaymentForm />}
          </div>
        )}
      </div>

      <button className="logout_btn" onClick={handleLogout}>
        <img src={SignoutIcon} alt="sign out" />
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
