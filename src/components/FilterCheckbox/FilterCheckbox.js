import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onlyShort, handleCheckBoxStatus }) => {
  const handleOnClick = (e) => {
    handleCheckBoxStatus(e.target.checked);
  }
  return (
    <div className='filter-checkbox'>
      <div className='filter-checkbox__wrapper'>
        <input className='filter-checkbox__btn' type='checkbox' id='short-movies' defaultChecked={Boolean(onlyShort.isChecked)} onChange={e => handleOnClick(e)} />
        <div className='filter-checkbox__sliding-btn'></div>
        <label htmlFor='short-movies' className='filter-checkbox__label'>
        </label>
      </div>
      <p className='filter-checkbox__label-text'>
        Короткометражки
      </p>
    </div>
  )
};

export default FilterCheckbox;