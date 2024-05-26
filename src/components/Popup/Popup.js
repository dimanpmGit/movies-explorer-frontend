import React from "react";
import './Popup.css';

export const Popup = ({ element: Component, ...props }) => {
  return (
    <div className='popup'>
      <Component {...props} />
    </div>
  );
}