import React from 'react';
import './MoreButton.css';

const MoreButton = ({ text }) => {
  return (
    <div className='more-button'>
      <button className='more-button__btn'>
        {text}
      </button>
    </div>
  )
};

export default MoreButton;