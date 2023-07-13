import React from 'react';
import './SuccessButton.css';

const SuccessButton = ({ text }) => {
  return (
    <button className='success-button__btn'>{text}</button>
  )
};

export default SuccessButton;