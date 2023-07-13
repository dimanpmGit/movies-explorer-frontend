import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ text, onClick, className }) => {
  return (
    <button className={`${className || ''} submit-button__btn`} type='submit' onClick={onClick}>{text}</button>
  )
};

export default SubmitButton;