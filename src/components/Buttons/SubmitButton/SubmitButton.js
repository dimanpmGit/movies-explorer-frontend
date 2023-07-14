import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ text, onClick }) => {
  return (
    <div className='submit-button'>
      <button className='submit-button__btn' type='submit' onClick={onClick}>{text}</button>
    </div>
  )
};

export default SubmitButton;