import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className='search-form'>
      <div className='search-form__container'>
        <div className='search-form__wrapper'>
          <input className='search-form__input' type='text' name='film' placeholder='Фильм'></input>
          <button className='search-form__button' type='submit'>Поиск</button>
        </div>
        <div className='search-form__short-films-wrapper'>
          <div className='search-form__short-films'>
            <input className='search-form__short-films-btn' type='checkbox' id='short-films'/>
            <div className='search-form__sliding-btn'></div>
            <label for='short-films' className='search-form__short-films' name='short-films'>
              <p className='search-form__short-films-label'>
                  Короткометражки
                </p>
              </label>
          </div>
        </div>
        <div className='search-form__hr'></div>
      </div>
    </form>
  )
};

export default SearchForm;