import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card, onlySaved }) => {
  return (
      <div className='movies-card'>
        <img className='movies-card__picture' src={card.picture} alt={card.alt}/>
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name app__link'>{card.title}</p>
          {onlySaved ? <div className='movies-card__close-btn app__link'></div> : <div className='movies-card__like app__link'></div>}
        </div>
        <p className='movies-card__movie-duration'>{card.duration}</p>
      </div>
)};

export default MoviesCard;