/* eslint-disable react/prop-types */
const ConfirmationPopup = ({
  remove,
  id,
  close,
  type,
  updateOrders,
  updateUsers,
}) => {
  
  const handleRemove = (id) => {
    remove(id);
    close(false);
    if (type === 'Order') {
      updateOrders((prevOrders) => prevOrders.filter((o) => o._id !== id));
    } else if (type === 'User') {
      updateUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    }
  };
  return (
    <div className="confirmation_popup">
      <h2>Confirm Removal</h2>
      <p>Are you sure you want to remove this {`${type}`}?</p>
      <div className="confirmation_buttons">
        <button className="yes_btn" onClick={() => handleRemove(id)}>
          Yes
        </button>
        <button className="no_btn" onClick={() => close(false)}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
