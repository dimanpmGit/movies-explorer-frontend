import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';

const Movies = ({ setAllMovies, notMain, onlySaved }) => {
  notMain();
  setAllMovies();
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList onlySaved={onlySaved} />
      <div className='movies__more-btn-wrapper'>
        <MoreButton text={'Ещё'}/>
      </div>
    </section>
  )
};

export default Movies;