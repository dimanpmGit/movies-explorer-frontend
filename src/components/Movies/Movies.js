import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

const Movies = ({ startPreloader, stopPreloader }) => {
  const [moviesSet, setMoviesSet] = useState(localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
  const [foundMovies, setFoundMovies] = useState(localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
  const [moreButtonClicksCounter, setClicksCounter] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [onlyShort, setOnlyShort] = useState(false);

  const searchMoviesInDownloaded = (text, moviesSet) => {
    return moviesSet.filter((movies) => (movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase()))));
  }

  const localMoviesSearch = (movies, value) => {
    const moviesArr = Array.from(movies);
    setFoundMovies([]);
    setClicksCounter(0);
    localStorage.setItem('phrase', value);
    localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
    moviesArr.map((movie) => {
      return setFoundMovies(foundMovies => [...[...new Set(foundMovies)], movie]);
    })
  }

  const searchMovies = (value) => {
    setMoviesSet([]);
    setClicksCounter(0);
    //console.log(JSON.parse(localStorage.getItem('movies')));
    // Если фильмы еще не скачивались, то скачиваем...
    startPreloader();
    
    moviesApi.getMovies()
      .then((data) => {
        if (data) {
          const moviesArr = Array.from(data);
          moviesArr.map((item) => {
            (moviesSet.length <= moviesArr.length) &&
              setMoviesSet(moviesSet => [...moviesSet, item]);
            stopPreloader();
          });
          //Сохраняем данные поиска в локальное хранилище
          localStorage.setItem('movies', JSON.stringify(moviesArr));
          localStorage.setItem('phrase', value);
          localStorage.setItem('more-btn-clicks', moreButtonClicksCounter);
          //... и выполняем поиск
          localMoviesSearch(searchMoviesInDownloaded(localStorage.getItem('phrase'), moviesArr), value);
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    localStorage.setItem('only-short', onlyShort);
    localMoviesSearch(searchMoviesInDownloaded(localStorage.getItem('phrase'), moviesSet) , localStorage.getItem('phrase'));
  }, [onlyShort])

  const handleOnlyShortChange = () => {
    setOnlyShort(!onlyShort);
  }
/*
  useEffect(() => {
    localStorage.setItem('only-short', onlyShort);
    console.log(`localStorage.getItem('only-short'): ${localStorage.getItem('only-short')}`);
  }, [onlyShort])*/
  
  const handleMoreButtonClick = () => {
    setClicksCounter(moreButtonClicksCounter + 1);
  }

  const handleHideMoreButton = () => {
    setShowMoreButton(false);
  }
  const handleShowMoreButton = () => {
    setShowMoreButton(true);
  }
  //console.log(`onlyShort: ${onlyShort}`);
  //console.log(`localStorage.getItem('only-short'): ${localStorage.getItem('only-short')}`);
/*
  console.log(`localStorage.getItem('movies'): `);
  console.log(localStorage.getItem('movies'));
  console.log(JSON.parse(localStorage.getItem('movies')));
  console.log(`moviesSet: `);
  console.log(moviesSet);
  console.log(`localStorage.getItem('phrase'): ${localStorage.getItem('phrase')}`);
  console.log(`localStorage.getItem('only-short'): ${localStorage.getItem('only-short')}`);
  console.log(`localStorage.getItem('more-btn-clicks'): ${localStorage.getItem('more-btn-clicks')}`);*/
  return (
    <>
      <Header isMain={false} isAllMovies={true} />
      <section className='movies'>
        <SearchForm onSearchClick={searchMovies} onlyShort={onlyShort} handleOnlyShortChange={handleOnlyShortChange} phrase={localStorage.getItem('phrase')} />
        <MoviesCardList onlyShort={onlyShort} foundMovies={foundMovies} moreButtonClicksCounter={moreButtonClicksCounter} showMoreButton={handleShowMoreButton} hideMoreButton={handleHideMoreButton} moreButtonStatus={showMoreButton} />
        <div className='movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'} onClick={handleMoreButtonClick} moreButtonStatus={showMoreButton} />
        </div>
      </section>
      <Footer />
    </>
  )
};

export default Movies;