import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useInput } from '../Validation/Validation';

const SearchForm = ({ phrase, onSearchClick, handleCheckBoxStatus, onlyShort }) => {

  const searchString = useInput('', { isEmpty: true });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchClick(searchString.value);
  }

  useEffect(() => {
    searchString.onChangeInitial(phrase);
  }, [])
  
  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='search-form__container'>
        <div className='search-form__wrapper'>
          {(searchString.isDirty && !searchString.isInputValid) && <span className='search-form__err-msg'>Нужно ввести ключевое слово</span>}
          <input className={`search-form__input ${(searchString.isDirty && !searchString.isInputValid) && 'search-form__input_failed'}`} type='text' name='movie' placeholder='Фильм' value={searchString.value} onChange={e => searchString.onChange(e)} onBlur={e => searchString.onBlur(e)} required></input>
          <button className='search-form__button' type='submit' disabled={!searchString.isInputValid}>Поиск</button>
        </div>
        <FilterCheckbox onlyShort={onlyShort} handleCheckBoxStatus={handleCheckBoxStatus} />
        <div className='search-form__hr'></div>
      </div>
    </form>
  )
};

export default SearchForm;