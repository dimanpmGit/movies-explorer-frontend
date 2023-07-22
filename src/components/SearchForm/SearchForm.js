import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useInput } from '../Validation/Validation';
import * as moviesApi from '../../utils/MoviesApi';

const SearchForm = ({ startPreloader, stopPreloader, onSearchClick, onlyShort, handleOnlyShortChange }) => {
  const [moviesSet, setMoviesSet] = useState([]);
  const searchString = useInput('', { isEmpty: true });

  const searchMoviesInDownloaded = (text, moviesSet) => {
    return moviesSet.filter((movies) => (movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase()))));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Если фильмы еще не скачивались, то скачиваем...
    if ((moviesSet === undefined) || (moviesSet.length === 0)) {
      startPreloader();
      moviesApi.getMovies()
        .then((data) => {
          if (data) {
            const moviesArr = Array.from(data);
            moviesArr.map((item) => {
              (moviesSet.length <= moviesArr.length) &&
                setMoviesSet(moviesSet => [...moviesSet, item]);
              stopPreloader();
            });
            //... и выполняем поиск
            onSearchClick(searchMoviesInDownloaded(searchString.value, moviesArr));
          }
        })
        .catch(err => console.log(err));
    } else {
      //Если фильмы уже скачены, выполняем поиск
      onSearchClick(searchMoviesInDownloaded(searchString.value, moviesSet));
    }
  }
  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='search-form__container'>
        <div className='search-form__wrapper'>
          {(searchString.isDirty && !searchString.isInputValid) && <span className='search-form__err-msg'>Нужно ввести ключевое слово</span>}
          <input className={`search-form__input ${(searchString.isDirty && !searchString.isInputValid) && 'search-form__input_failed'}`} type='text' name='movie' placeholder='Фильм' value={searchString.value} onChange={e => searchString.onChange(e)} onBlur={e => searchString.onBlur(e)} required></input>
          <button className='search-form__button' type='submit' disabled={!searchString.isInputValid}>Поиск</button>
        </div>
        <FilterCheckbox onlyShort={onlyShort} handleChange={handleOnlyShortChange} />
        <div className='search-form__hr'></div>
      </div>
    </form>
  )
};

export default SearchForm;