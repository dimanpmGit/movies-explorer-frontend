import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { cards } from '../../utils/constants';

const MoviesCardList = ({ onlySaved }) => {
  if (onlySaved) {
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {cards.map((card, i) => (
          card.saved ? <MoviesCard key={i} card={card} onlySaved={onlySaved} /> : ''
        ))}
      </div>
    </div>
  )}
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {cards.map((card, i) => <MoviesCard key={i} card={card} onlySaved={onlySaved} />)}
      </div>
    </div>
  )
};

export default MoviesCardList;