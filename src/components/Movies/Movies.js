import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import { SHORT_MOVIES_LIMIT } from '../../utils/constants';
import { Error } from '../Error/Error';

const Movies = ({ loggedIn, startPreloader, stopPreloader }) => {
  //localStorage.removeItem('saved-movies');
  //Хранение скачанных фильмов
  const [moviesSet, setMoviesSet] = useState(() => localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
  //Хранение скачанных сохраненных фильмов
  const [savedMoviesSet, setSavedMoviesSet] = useState(() => localStorage.getItem('saved-movies') ? JSON.parse(localStorage.getItem('saved-movies')) : []);
  //Показатель, что находимся в фильмах и должно отображаться сердечко для добавления фильма
  const [isSaved, setIsSaved] = useState(false);
  
  //Хранение отсортированных по поиску фильиов
  const [foundMovies, setFoundMovies] = useState(() => localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
  const [moreButtonClicksCounter, setClicksCounter] = useState(() => localStorage.getItem('more-btn-clicks') ? Number(localStorage.getItem('more-btn-clicks')) : 0 );
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [onlyShort, setOnlyShort] = useState({ isChecked: Number(localStorage.getItem('only-short')) });
  const [phrase, setPhrase] = useState(() => (localStorage.getItem('phrase') === null) ? '' : localStorage.getItem('phrase'));
  const getPhrase = (phrase) => {
    setPhrase(phrase);
  }
  const [errorStatus, setErrorStatus] = useState(() => false);
  const [errorText, setErrorText] = useState(() => 'Что-то пошло не так...');
  const [likesStatus, setLikesStatus] = useState();

  const handleOnError = (text) => {
    setErrorText(() => text || 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
    setErrorStatus(() => true);
  }

  const closeBtnClick = (e) => {
    e.preventDefault();
    setErrorStatus(() => false);
  }
  
  const getOnlyShort = (value) => {
    setOnlyShort({ ...onlyShort, isChecked: value });
  }

  const searchMoviesInDownloaded = (text, moviesSet) => {
    if (text.length === 0) {
      return moviesSet.filter((movies) => ((movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase())))) && (onlyShort.isChecked ? movies.duration <= SHORT_MOVIES_LIMIT : movies.duration > 0));
    }
    else if (moviesSet.length > 0) {
      const foundMovies = moviesSet.filter((movies) => ((movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase())))) && (onlyShort.isChecked ? movies.duration <= SHORT_MOVIES_LIMIT : movies.duration > 0));
      if (foundMovies.length === 0) {
        handleOnError('Ничего не найдено');
      }
      return foundMovies;
    }
  }

  const getFoundMoviesArray = (movies) => {
    if ((movies !== undefined) && (movies !== null)) {
      const moviesArr = Array.from(movies);
      setFoundMovies(() => []);
      localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
      moviesArr.map((movie) => {
        return setFoundMovies(foundMovies => [...[...new Set(foundMovies)], movie]);
      })
    }
    return [];
  }

  // Скачивает сохраненные фильмы...
  const getSavedMovies = () => {
    startPreloader();
    mainApi.getSavedMovies()
      .then((data) => {
        setSavedMoviesSet(() => []);
        if (data) {
          stopPreloader();
          const moviesArr = Array.from(data);
          //Сохраняем данные поиска в локальное хранилище
          localStorage.removeItem('saved-movies');
          localStorage.setItem('saved-movies', JSON.stringify(moviesArr));
          moviesArr.map((movie) => {
          return setSavedMoviesSet(savedMoviesSet => [...[...new Set(savedMoviesSet)],
              movie]);
          });
        }
        else if (data.message) {
          return handleOnError(data.message);
        }
      })
      .catch((err) => {
        stopPreloader();
        handleOnError(err);
      });
  }

  const handleSearchMoviesClick = (value) => {
    getPhrase(value);
    localStorage.setItem('phrase', value);
    // Если фильмы еще не скачивались, то скачиваем...
    if ((moviesSet === null) || (moviesSet === undefined) || (moviesSet.length === 0)) {
      setMoviesSet(() => []);
      startPreloader();
      moviesApi.getMovies()
        .then((data) => {
          if (data) {
            stopPreloader();
            const moviesArr = Array.from(data);
            //Сохраняем данные поиска в локальное хранилище
            localStorage.setItem('movies', JSON.stringify(moviesArr));
            moviesArr.map((movie) => {
            setMoviesSet(moviesSet => [...[...new Set(moviesSet)], movie]);
            });
            getFoundMoviesArray(searchMoviesInDownloaded(value, moviesArr));
          }
          else if (data.message) {
            return handleOnError(data.message);
          }
        })
        .catch((err) => {
          stopPreloader();
          handleOnError(err);
        });
    }
    // Скачиваем сохраненные фильмы...
    //getSavedMovies();
    //Если фильмы уже скачены, сбрасываем счетчик нажатий кнопки [Ещё] и выполняем поиск
    setClicksCounter(() => 0);
    localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
    localStorage.removeItem('more-btn-clicks');
    getFoundMoviesArray(searchMoviesInDownloaded(value, moviesSet));
  }

  const handleCheckBoxStatus = (value) => {
    getOnlyShort((value ? 1 : 0));
    localStorage.setItem('only-short', (value ? 1 : 0));
  }
  
  const handleMoreButtonClick = () => {
    setClicksCounter((counter) => counter + 1);
  };

  const handleLikeButtonClick = () => {
    setLikesStatus((likesStatus) => !likesStatus);
  }

  const handleHideMoreButton = () => {
    setShowMoreButton(false);
  }
  const handleShowMoreButton = () => {
    setShowMoreButton(true);
  }

  useEffect(() => {
    localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
  }, [moreButtonClicksCounter]);

  useEffect(() => {
    setIsSaved(() => false);
  }, [isSaved]);

  useEffect(() => {
    getFoundMoviesArray(searchMoviesInDownloaded(phrase, moviesSet));
  }, [onlyShort, moviesSet, phrase]);

  return (
    <>
      <Header loggedIn={loggedIn} isMain={false} isAllMovies={true} />
      <section className='movies'>
        <SearchForm phrase={phrase} onSearchClick={handleSearchMoviesClick} handleCheckBoxStatus={handleCheckBoxStatus} onlyShort={onlyShort} />
        <MoviesCardList foundMovies={foundMovies} moreButtonClicksCounter={moreButtonClicksCounter} showMoreButton={handleShowMoreButton} hideMoreButton={handleHideMoreButton} moreButtonStatus={showMoreButton} isSaved={isSaved} startPreloader={startPreloader} stopPreloader={stopPreloader} handleDeleteClick={handleLikeButtonClick} />
        <div className='movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'} onClick={handleMoreButtonClick} moreButtonStatus={showMoreButton} />
        </div>
        <Error errorText={errorText} errorStatus={errorStatus} closeBtnClick={closeBtnClick} />
      </section>
      <Footer />
    </>
  )
};

export default Movies;