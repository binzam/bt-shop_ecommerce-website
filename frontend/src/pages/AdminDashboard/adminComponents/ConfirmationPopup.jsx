/* eslint-disable react/prop-types */

const ConfirmationPopup = ({ remove, id, close, type }) => {
  const handleRemove = (id) => {
    remove(id);
  };
  return (
    <div className="confirmation_popup">
      <h2>Confirm Removal</h2>
      <p>Are you sure you want to remove this {`${type}`}?</p>
      <div className="confirmation_buttons">
        <button className="yes_btn" onClick={() => handleRemove(id)}>Yes</button>
        <button className="no_btn" onClick={() => close(false)}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
