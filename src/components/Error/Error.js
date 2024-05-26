import React from 'react';
import './Error.css';

export const Error = ({ errorText, errorStatus, closeBtnClick }) => {
  return (
    <div className={`error ${errorStatus ? 'error_active' : ''}`} >
      <div className='error__container'>
        <div className='error__wrapper'>
          <button className='error__close-btn' onClick={e => closeBtnClick(e)}></button>
          <h2 className='error__message'>
            {errorText}
          </h2>
        </div>
      </div>
    </div>
  )};