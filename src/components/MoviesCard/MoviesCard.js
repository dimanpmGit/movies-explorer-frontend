import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card, onlySaved }) => {
  return (
      <div className='movies-card'>
      <a className='movies-card__picture-link app__link' href={card.link} target='_blank' rel='noreferrer'>
          <img className='movies-card__picture' src={card.picture} alt={card.alt}/>
        </a>
        <div className='movies-card__name-and-like'>
        <a className='movies-card__name app__link' href={card.link} target='_blank' rel='noreferrer'>{card.title}</a>
          {onlySaved ? 
            <button className='movies-card__close-btn app__link'></button> :
          <button className={`movies-card__like ${card.like && "movies-card__like_active"} app__link`}></button>
          }
        </div>
        <p className='movies-card__movie-duration'>{card.duration}</p>
      </div>
)};

export default MoviesCard;