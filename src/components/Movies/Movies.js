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

const Movies = ({ startPreloader, stopPreloader }) => {
  //Хранение скачанных фильмов
  const [moviesSet, setMoviesSet] = useState(() => localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
  //Хранение отсортированных по поиску фильиов
  const [foundMovies, setFoundMovies] = useState(() => localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
  const [moreButtonClicksCounter, setClicksCounter] = useState(() => localStorage.getItem('more-btn-clicks') ? Number(localStorage.getItem('more-btn-clicks')) : 0 );
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
    return moviesSet.filter((movies) => ((movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase())))) && (onlyShort.isChecked ? movies.duration <= SHORT_MOVIES_LIMIT : movies.duration > 0));
  }

  const getFoundMoviesArray = (movies) => {
    const moviesArr = Array.from(movies);
    setFoundMovies(() => []);
    localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
    moviesArr.map((movie) => {
      return setFoundMovies(foundMovies => [...[...new Set(foundMovies)], movie]);
    })
  }

  const handleSearchMoviesClick = async (value) => {
    // Если фильмы еще не скачивались, то скачиваем...
    getPhrase(value);
    localStorage.setItem('phrase', value);
    if ((moviesSet === undefined) || (moviesSet.length === 0)) {
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
              return setMoviesSet(moviesSet => [...[...new Set(moviesSet)], movie]);
            });
            getFoundMoviesArray(searchMoviesInDownloaded(value, moviesArr));
          }
        })
        .catch(err => console.log(err));
    }
    //Если фильмы уже скачены, сбрасываем счетчик нажатий кнопки [Ещё] и выполняем поиск
    setClicksCounter(() => 0);
    localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
    localStorage.removeItem('more-btn-clicks');
    getFoundMoviesArray(searchMoviesInDownloaded(value, moviesSet));
  }

  useEffect(() => {
    getFoundMoviesArray(searchMoviesInDownloaded(phrase, moviesSet));
  }, [onlyShort]);


  const handleCheckBoxStatus = (value) => {
    getOnlyShort((value ? 1 : 0));
    localStorage.setItem('only-short', (value ? 1 : 0));
  }
  
  const handleMoreButtonClick = () => {
    setClicksCounter((counter) => counter + 1);
  };

  useEffect(() => {
    localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
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
        <MoviesCardList onlyShort={false} foundMovies={foundMovies} moreButtonClicksCounter={moreButtonClicksCounter} showMoreButton={handleShowMoreButton} hideMoreButton={handleHideMoreButton} moreButtonStatus={showMoreButton} />
        <div className='movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'} onClick={handleMoreButtonClick} moreButtonStatus={showMoreButton} />
        </div>
      </section>
      <Footer />
    </>
  )
};

export default Movies;