import React from "react";
import "./LoadingSpinner.css";
function LoadingSpinner({height, width}) {
  return (
    <span style={{height:height,width:width}} class="loader"></span>
  );
}

export default LoadingSpinner;
