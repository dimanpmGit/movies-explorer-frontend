import React from 'react';
import './MoreButton.css';

const MoreButton = ({ text, onClick, moreButtonStatus }) => {
  return (
    <div className={`more-button ${!moreButtonStatus ? 'more-button_none' : ''}`} >
      <button className='more-button__btn' onClick={onClick}>
        {text}
      </button>
    </div>
  )
};

export default MoreButton;