import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <form className='search-form'>
      <div className='search-form__container'>
        <div className='search-form__wrapper'>
          <input className='search-form__input' type='text' name='movie' placeholder='Фильм' required></input>
          <button className='search-form__button' type='submit'>Поиск</button>
        </div>
        <FilterCheckbox />
        <div className='search-form__hr'></div>
      </div>
    </form>
  )
};

export default SearchForm;