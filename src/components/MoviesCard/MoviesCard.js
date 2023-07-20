import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ movie, onlySaved }) => {
  return (
      <div className='movies-card'>
      <a className='movies-card__picture-link app__link' href={movie.link} target='_blank' rel='noreferrer'>
        <img className='movies-card__picture' src={movie.image.formats.thumbnail.url} alt={movie.nameRU}/>
        </a>
        <div className='movies-card__name-and-like'>
        <a className='movies-card__name app__link' href={movie.trailerLink} target='_blank' rel='noreferrer'>{movie.nameRU}</a>
          {onlySaved ? 
            <button className='movies-card__close-btn app__link'></button> :
          <button className={`movies-card__like ${movie.like && "movies-card__like_active"} app__link`}></button>
          }
        </div>
        <p className='movies-card__movie-duration'>{movie.duration}</p>
      </div>
)};

export default MoviesCard;
