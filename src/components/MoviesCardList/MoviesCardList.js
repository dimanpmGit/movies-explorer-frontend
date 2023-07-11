import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        <MoviesCard />
      </div>
    </div>
  )
};

export default MoviesCardList;