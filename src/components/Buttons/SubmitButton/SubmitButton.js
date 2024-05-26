import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ text, onClick, isDisabled }) => {
  return (
    <div className='submit-button'>
      <button className='submit-button__btn' type='submit' onClick={onClick} disabled={isDisabled}>{text}</button>
    </div>
  )
};

export default SubmitButton;