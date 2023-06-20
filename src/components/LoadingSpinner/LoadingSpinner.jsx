import React from "react";
import "./LoadingSpinner.css";
function LoadingSpinner({height, width}) {
  return (
    <span style={{height:height,width:width}} className="loader"></span>
  );
}

export default LoadingSpinner;
