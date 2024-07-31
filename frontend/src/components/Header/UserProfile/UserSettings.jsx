import { useState } from 'react';
import UpdatePassword from '../../Forms/UpdatePassword';
import GearIcon from '../../../assets/gear-solid.svg';
import ShippingForm from '../../Forms/ShippingForm';
import { useAuthContext } from '../../../hooks/useAuthContext';
const UserSettings = () => {
  const { isAdmin } = useAuthContext();
  const [showUpdatePassForm, setShowUpdatePassForm] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showUpdateShippingForm, setShowUpdateShippingForm] = useState(false);
  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setShowUpdatePassForm(false);
    setShowUpdateShippingForm(false);
  };
  const handleOpenChangePassword = () => {
    setShowUpdatePassForm(true);
    setShowUpdateShippingForm(false);
  };

  const handleOpenUpdateShipping = () => {
    setShowUpdateShippingForm(true);
    setShowUpdatePassForm(false);
  };

  return (
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
          {!isAdmin() && (
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
          )}
          {showUpdateShippingForm && <ShippingForm />}
        </div>
      )}
    </div>
  );
};

export default UserSettings;
