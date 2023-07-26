import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';
import { MOVIES_IMAGES_URL } from '../../utils/constants';
import * as mainApi from '../../utils/MainApi';
import { Error } from '../Error/Error';

const MoviesCard = ({ movie, isSaved, startPreloader, stopPreloader, handleDeleteClick }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [likeState, setLikeState] = useState(false);
  const allMoviesArr = localStorage.getItem('movies') ? Array.from(JSON.parse(localStorage.getItem('movies'))) : [];
  const [savedMoviesSet, setSavedMoviesSet] = useState(() => localStorage.getItem('saved-movies') ? JSON.parse(localStorage.getItem('saved-movies')) : []);
  const [errorStatus, setErrorStatus] = useState(() => false);
  const [errorText, setErrorText] = useState(() => 'Что-то пошло не так...');

  const handleOnError = (text) => {
    setErrorText(() => text || 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
    setErrorStatus(() => true);
  }

  const closeBtnClick = (e) => {
    e.preventDefault();
    setErrorStatus(() => false);
  }

  const getSavedMovies = () => {
    startPreloader();
    mainApi.getSavedMovies()
      .then((data) => {
        setSavedMoviesSet(() => []);
        stopPreloader();
        if (data) {
          //Сохраняем данные поиска в локальное хранилище
          const moviesArr = Array.from(data);
          localStorage.removeItem('saved-movies');
          localStorage.setItem('saved-movies', JSON.stringify(moviesArr));
          moviesArr.map((movie) => {
            return setSavedMoviesSet(savedMoviesSet => [...[...new Set(savedMoviesSet)], movie]);
          })        
        }
        else if (data.message) {
          return handleOnError('Что-то пошло не так...');
        }
      })
      .catch((err) => {
        stopPreloader();
        handleOnError(err);
      });
  }

  const onDeleteClick = () => {
    mainApi.deleteMovie(movie._id)
      .then((data) => {
        getSavedMovies();
        handleDeleteClick();
      })
      .catch(err => console.log(err));
  }

  const likeMovie = () => {
    setLikeState(() => true);
  }

  const dislikeMovie = () => {
    setLikeState(() => false);
  }

  const handleLikeClick = () => {
    //Если лайк уже стоял, то снимаем лайк и удаляем фильм из сохраненных
    let movieToAdd = structuredClone(movie);
    movieToAdd['owner'] = currentUser._id;
    movieToAdd['likedMovieId'] = JSON.stringify(movie.id);
    delete movieToAdd['id'];
    delete movieToAdd['created_at'];
    delete movieToAdd['updated_at'];
    const imageURL = MOVIES_IMAGES_URL + movie.image.url;
    delete movieToAdd['image'];
    movieToAdd['image'] = imageURL;
    if ((allMoviesArr !== undefined) && (allMoviesArr !== null)) {
      if ((allMoviesArr.find((item) => item.id === movie.id)) && (savedMoviesSet.find((item) => item.likedMovieId == movie.id))) {
        //Удаляем фильм и деактивируем лайк
        mainApi.deleteMovie(savedMoviesSet.find((item) => item.likedMovieId == movie.id)._id)
          .then((data) => {
            localStorage.setItem('saved-movies', JSON.stringify(data));
            getSavedMovies();
          })
          .catch(err => console.log(err));
        dislikeMovie();
      }
      else {
        //Сохраняем фильм и активируем лайк
        mainApi.saveMovie(movieToAdd)
          .then((data) => {
            getSavedMovies();
          })
          .catch(err => console.log(err));
        likeMovie();
      }
    }
  };

  const getLikeStatus = () => {
    if ((savedMoviesSet !== null) && (savedMoviesSet !== undefined) && (savedMoviesSet.length > 0)) {
      const likedMovie = savedMoviesSet.find((item) => item.likedMovieId == movie.id);
      if ((likedMovie !== undefined) && (likedMovie !== null)) {
        likeMovie();
      }
      else {
        dislikeMovie();
      }
    }
  }
  //Актуализация статуса лайка
  useEffect(() => {
    getLikeStatus();
  }, [likeState, savedMoviesSet])
  
  return (
      <div className='movies-card'>
        <a className='movies-card__picture-link app__link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
          <img className='movies-card__picture' src={`${!isSaved ? MOVIES_IMAGES_URL + movie.image.url : movie.image}`} alt={movie.nameRU}/>
          </a>
          <div className='movies-card__name-and-like'>
          <a className='movies-card__name app__link' href={movie.trailerLink} target='_blank' rel='noreferrer'>{movie.nameRU}</a>
            {isSaved ? 
              <button className='movies-card__close-btn app__link' onClick={onDeleteClick}></button> :
            <button className={`movies-card__like ${likeState && "movies-card__like_active"} app__link`} onClick={handleLikeClick}></button>
            }
          </div>
        <p className='movies-card__movie-duration'>{`${Math.floor(movie.duration / 60) !== 0 ? Math.floor(movie.duration / 60) + 'ч' : ''}${(movie.duration % 60) ? (movie.duration % 60) + 'м' : ''}`}</p>
        <Error errorText={errorText} errorStatus={errorStatus} closeBtnClick={closeBtnClick} />
      </div>
)};

export default MoviesCard;
