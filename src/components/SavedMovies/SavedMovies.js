import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as mainApi from '../../utils/MainApi';
import { SHORT_MOVIES_LIMIT } from '../../utils/constants';

const SavedMovies = ({ startPreloader, stopPreloader }) => {
  //Хранение скачанных сохраненных фильмов
  const [savedMoviesSet, setSavedMoviesSet] = useState(() => localStorage.getItem('saved-movies') ? JSON.parse(localStorage.getItem('saved-movies')) : []);
  //Хранение отсортированных по поиску фильиов
  const [foundMovies, setFoundMovies] = useState(() => localStorage.getItem('save-movies') ? JSON.parse(localStorage.getItem('saved-movies')) : []);

  //Показатель, что находимся в сохраненных фильмах и должен отображаться крестик удаления фильма
  const [isSaved, setIsSaved] = useState(true);

  const [moreButtonClicksCounter, setClicksCounter] = useState(() => localStorage.getItem('more-btn-clicks-saved') ? Number(localStorage.getItem('more-btn-clicks-saved')) : 0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [onlyShort, setOnlyShort] = useState({ isChecked: Number(localStorage.getItem('only-short')) });
  const [phrase, setPhrase] = useState(() => (localStorage.getItem('phrase') === null) ? '' : localStorage.getItem('phrase'));
  const getPhrase = (phrase) => {
    setPhrase(phrase);
  }

  const getOnlyShort = (value) => {
    setOnlyShort({ ...onlyShort, isChecked: value });
  }

  const searchMoviesInDownloaded = (text, moviesSet) => {
    if ((moviesSet !== undefined) && (moviesSet !== null)) {
    return moviesSet.filter((movies) => ((movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase())))) && (onlyShort.isChecked ? movies.duration <= SHORT_MOVIES_LIMIT : movies.duration > 0));
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
            localStorage.removeItem('saved-movies');
            setSavedMoviesSet(() => []);
            localStorage.setItem('saved-movies', []);
          }
          else {
            //Сохраняем данные поиска в локальное хранилище
            const moviesArr = Array.from(data);
            localStorage.removeItem('saved-movies');
            localStorage.setItem('saved-movies', JSON.stringify(moviesArr));
            moviesArr.map((movie) => {
              return setSavedMoviesSet(savedMoviesSet => [...[...new Set(savedMoviesSet)], movie]);
            })
          }
        }
      })
      .catch(err => console.log(err));
  }

  const handleDeleteClick = () => {
    getSavedMovies();
  }

  const handleSearchMoviesClick = (value) => {
    getPhrase(value);
    localStorage.setItem('phrase', value);
    //Сбрасываем счетчик нажатий кнопки [Ещё] и выполняем поиск
    setClicksCounter(() => 0);
    localStorage.setItem('more-btn-clicks-saved', moreButtonClicksCounter);
    localStorage.removeItem('more-btn-clicks-saved');
    getFoundMoviesArray(searchMoviesInDownloaded(value, savedMoviesSet));
  }

  useEffect(() => {
    getFoundMoviesArray(searchMoviesInDownloaded(phrase, savedMoviesSet));
  }, [onlyShort, savedMoviesSet, phrase]);

  const handleCheckBoxStatus = (value) => {
    getOnlyShort((value ? 1 : 0));
    localStorage.setItem('only-short', (value ? 1 : 0));
  }

  const handleMoreButtonClick = () => {
    setClicksCounter((counter) => counter + 1);
  };

  useEffect(() => {
    setIsSaved(() => true);
  }, [isSaved]);

  useEffect(() => {
    localStorage.setItem('more-btn-clicks-saved', moreButtonClicksCounter);
  }, [moreButtonClicksCounter]);


  const handleHideMoreButton = () => {
    setShowMoreButton(false);
  }
  const handleShowMoreButton = () => {
    setShowMoreButton(true);
  }
  return (
    <>
      <Header isMain={false} isAllMovies={true} />
      <section className='movies'>
        <SearchForm phrase={phrase} onSearchClick={handleSearchMoviesClick} handleCheckBoxStatus={handleCheckBoxStatus} onlyShort={onlyShort} />
        <MoviesCardList foundMovies={foundMovies} moreButtonClicksCounter={moreButtonClicksCounter} showMoreButton={handleShowMoreButton} hideMoreButton={handleHideMoreButton} moreButtonStatus={showMoreButton} isSaved={'true'} startPreloader={startPreloader} stopPreloader={stopPreloader} handleDeleteClick={handleDeleteClick}/>
        <div className='movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'} onClick={handleMoreButtonClick} moreButtonStatus={showMoreButton} />
        </div>
      </section>
      <Footer />
    </>
  )
};

export default SavedMovies;