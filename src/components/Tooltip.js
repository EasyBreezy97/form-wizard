import React from "react";

const Tooltip = ({ message, show}) => {
  return (
    show &&  (
      <div className="tooltip">
        <span className="tooltip-text">{message}</span>
      </div>
    )
  );
};

export default Tooltip;
