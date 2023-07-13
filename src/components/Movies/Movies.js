import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';

const Movies = ({ notMain, onlySaved }) => {
  notMain();
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList onlySaved={onlySaved} />
      <MoreButton />
    </section>
  )
};

export default Movies;