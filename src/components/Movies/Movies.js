import React, { useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';

const Movies = ({ setAllMovies, notMain, onlySaved, setWithHeader, setFooterNeeds, moviesSet }) => {
  useEffect(() => {
    notMain();
    setAllMovies();
    setWithHeader();
    setFooterNeeds();
  }, [])
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList onlySaved={onlySaved} moviesSet={moviesSet} />
      <div className='movies__more-btn-wrapper'>
        <MoreButton text={'Ещё'}/>
      </div>
    </section>
  )
};

export default Movies;