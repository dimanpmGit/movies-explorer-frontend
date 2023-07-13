import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ text }) => {
  return (
    <button className='submit-button__btn' type='submit'>{text}</button>
  )
};

export default SubmitButton;