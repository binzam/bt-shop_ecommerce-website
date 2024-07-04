/* eslint-disable react/prop-types */
const Error = ({ error }) => {
  return (
    <div className="error_container">
      <div className="error_message">Error: {error}</div>
    </div>
  );
};

export default Error;
