import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ notMain, onlySaved }) => {
  notMain();
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList onlySaved={onlySaved} />
      <div className='saved-movies__divider'></div>
    </section>
  )
};

export default SavedMovies;