import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as mainApi from '../../utils/MainApi';
import { SHORT_MOVIES_LIMIT, ERR_MSG_WHEN_NO_SERVER, ERR_MSG_SOMETHING_WRONG } from '../../utils/constants';
import { Error } from '../Error/Error';

const SavedMovies = ({ loggedIn, startPreloader, stopPreloader }) => {
  //Хранение скачанных сохраненных фильмов
  const [savedMoviesSet, setSavedMoviesSet] = useState(() => []);
  //Хранение отсортированных по поиску фильиов
  const [foundMovies, setFoundMovies] = useState(() => []);

  //Показатель, что находимся в сохраненных фильмах и должен отображаться крестик удаления фильма
  const [isSaved, setIsSaved] = useState(true);
  const [errorStatus, setErrorStatus] = useState(() => false);
  const [errorText, setErrorText] = useState(() => ERR_MSG_SOMETHING_WRONG);
  
  const [moreButtonClicksCounter, setClicksCounter] = useState(() => localStorage.getItem('more-btn-clicks-saved') ? Number(localStorage.getItem('more-btn-clicks-saved')) : 0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [onlyShort, setOnlyShort] = useState({ isChecked: Number(localStorage.getItem('only-short-saved')) });
  const [phrase, setPhrase] = useState(() => (localStorage.getItem('phrase-saved') === null) ? '' : localStorage.getItem('phrase-saved'));
  
  const closeBtnClick = (e) => {
    e.preventDefault();
    setErrorStatus(() => false);
  }

  const handleOnError = (text) => {
    setErrorText(() => text || ERR_MSG_WHEN_NO_SERVER);
    setErrorStatus(() => true);
  }

  const getPhrase = (phrase) => {
    setPhrase(phrase);
  }

  const getOnlyShort = (value) => {
    setOnlyShort({ ...onlyShort, isChecked: value });
  }

  const searchMoviesInDownloaded = (text, moviesSet) => {
    if ((moviesSet !== undefined) && (moviesSet !== null) && (!moviesSet.message)) {
      if (text.length === 0) {
        return moviesSet.filter((movies) => (onlyShort.isChecked ? movies.duration <= SHORT_MOVIES_LIMIT : movies.duration > 0));
      }
      else if (moviesSet.length > 0) {
        const foundMovies = moviesSet.filter((movies) => ((movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase())))) && (onlyShort.isChecked ? movies.duration <= SHORT_MOVIES_LIMIT : movies.duration > 0));
        if (foundMovies.length === 0) {
          handleOnError('Ничего не найдено');
        }
      return foundMovies;
      }
    }
  }

  const getFoundMoviesArray = (movies) => {
    if ((movies !== undefined) && (movies !== null)) {
      const moviesArr = Array.from(movies);
      setFoundMovies(() => []);
      localStorage.setItem('more-btn-clicks-saved', moreButtonClicksCounter);
      moviesArr.map((movie) => {
        return setFoundMovies(foundMovies => [...[...new Set(foundMovies)], movie]);
      })
    }
  }

  const getSavedMovies = () => {
    startPreloader();
    mainApi.getSavedMovies()
      .then((data) => {
        setSavedMoviesSet(() => []);
        stopPreloader();
        if (data) {
          if (data.message) {
            setSavedMoviesSet(() => []);
          }
          else {
            const moviesArr = Array.from(data);
            moviesArr.map((movie) => {
              setSavedMoviesSet(savedMoviesSet => [...[...new Set(savedMoviesSet)], movie]);
            })
            return getFoundMoviesArray(searchMoviesInDownloaded(phrase, moviesArr));
          }
        }
      })
      .catch(err => console.log(err));
  }

  const handleDeleteClick = (movie) => {
    getSavedMovies();
  }

  const handleSearchMoviesClick = (value) => {
    getPhrase(value);
    localStorage.setItem('phrase-saved', value);
    //Сбрасываем счетчик нажатий кнопки [Ещё] и выполняем поиск
    setClicksCounter(() => 0);
    localStorage.setItem('more-btn-clicks-saved', moreButtonClicksCounter);
    localStorage.removeItem('more-btn-clicks-saved');
    getFoundMoviesArray(searchMoviesInDownloaded(value, savedMoviesSet));
  }

  const handleCheckBoxStatus = (value) => {
    getOnlyShort((value ? 1 : 0));
    localStorage.setItem('only-short-saved', (value ? 1 : 0));
  }

  const handleMoreButtonClick = () => {
    setClicksCounter((counter) => counter + 1);
  }

  const handleHideMoreButton = () => {
    setShowMoreButton(false);
  }

  const handleShowMoreButton = () => {
    setShowMoreButton(true);
  }

  //Хук для скачивания сохраненных фильмов с сервера api
  useEffect(() => {
    getSavedMovies();
  }, []);

  //Хук для поиска короткометражных фильмов без запроса у сервера api
  useEffect(() => {
    getFoundMoviesArray(searchMoviesInDownloaded(phrase, savedMoviesSet));
  }, [onlyShort, phrase]);

  useEffect(() => {
    setIsSaved(() => true);
  }, [isSaved]);

  useEffect(() => {
    localStorage.setItem('more-btn-clicks-saved', moreButtonClicksCounter);
  }, [moreButtonClicksCounter]);

  return (
    <>
      <Header loggedIn={loggedIn} isMain={false} isAllMovies={true} />
      <section className='movies'>
        <SearchForm phrase={phrase} onSearchClick={handleSearchMoviesClick} handleCheckBoxStatus={handleCheckBoxStatus} onlyShort={onlyShort} />
        <MoviesCardList foundMovies={foundMovies} moreButtonClicksCounter={moreButtonClicksCounter} showMoreButton={handleShowMoreButton} hideMoreButton={handleHideMoreButton} moreButtonStatus={showMoreButton} isSaved={'true'} startPreloader={startPreloader} stopPreloader={stopPreloader} handleDeleteClick={handleDeleteClick}/>
        <div className='movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'} onClick={handleMoreButtonClick} moreButtonStatus={showMoreButton} />
        </div>
        <Error errorText={errorText} errorStatus={errorStatus} closeBtnClick={closeBtnClick} />
      </section>
      <Footer />
    </>
  )
};

export default SavedMovies;