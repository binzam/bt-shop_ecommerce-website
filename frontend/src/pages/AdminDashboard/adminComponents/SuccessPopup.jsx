/* eslint-disable react/prop-types */
const SuccessPopup = ({ type }) => {
  return (
    <div className="success_popup">
      <h2>{`${type}`}Removed</h2>
      <p>The {`${type}`} has been successfully removed.</p>
    </div>
  );
};

export default SuccessPopup;
