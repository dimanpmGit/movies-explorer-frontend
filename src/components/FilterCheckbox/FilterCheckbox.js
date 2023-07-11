import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className='filter-checkbox'>
      <div className='filter-checkbox__wrapper'>
        <input className='filter-checkbox__btn' type='checkbox' id='short-movies' />
        <div className='filter-checkbox__sliding-btn'></div>
        <label for='short-movies' className='filter-checkbox__wrapper' name='short-movies'>
          <p className='filter-checkbox__label'>
            Короткометражки
          </p>
        </label>
      </div>
    </div>
  )
};

export default FilterCheckbox;