import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        <MoviesCard allMovies={props.allMovies} />
      </div>
    </div>
  )
};

export default MoviesCardList;