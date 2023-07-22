import React, { useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as api from '../../utils/MainApi';

const SavedMovies = ({ startPreloader, stopPreloader }) => {
  
  const [moviesSet, setMoviesSet] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [moreButtonClicksCounter, setClicksCounter] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [onlyShort, setOnlyShort] = useState(false);

  const searchMoviesInDownloaded = (text, moviesSet) => {
    return moviesSet.filter((movies) => (movies.nameRU.toLowerCase().includes((text.toLowerCase()))) || (movies.nameEN.toLowerCase().includes((text.toLowerCase()))));
  }

  const handleSearchClick = (value) => {
    setMoviesSet([]);
    setClicksCounter(0);
    // Если фильмы еще не скачивались, то скачиваем...
    if ((moviesSet === undefined) || (moviesSet.length === 0)) {
      startPreloader();
      api.getMovies()
        .then((data) => {
          if (data) {
            const moviesArr = Array.from(data);
            moviesArr.map((item) => {
              (moviesSet.length <= moviesArr.length) &&
                setMoviesSet(moviesSet => [...moviesSet, item]);
              stopPreloader();
            });
            //... и выполняем поиск
            moviesSearch(searchMoviesInDownloaded(value, moviesArr));
          }
        })
        .catch(err => console.log(err));
    } else {
      //Если фильмы уже скачены, выполняем поиск
      moviesSearch(searchMoviesInDownloaded(value, moviesSet));
    }
  }

  const handleOnlyShortChange = () => {
    setOnlyShort(!onlyShort);
  }
  
  const handleMoreButtonClick = () => {
    setClicksCounter(moreButtonClicksCounter + 1);
  }

  const moviesSearch = (movies) => {
    setFoundMovies([]);
    setClicksCounter(0);
    const moviesArr = Array.from(movies);
    moviesArr.map((movie) => {
      return setFoundMovies(foundMovies => [...[...new Set(foundMovies)], movie]);
    })
  }
  const handleHideMoreButton = () => {
    setShowMoreButton(false);
  }
  const handleShowMoreButton = () => {
    setShowMoreButton(true);
  }
  return (
    <>
      <Header isMain={false} isAllMovies={true} />
      <section className='saved-movies'>
        <SearchForm onSearchClick={handleSearchClick} onlyShort={onlyShort} handleOnlyShortChange={handleOnlyShortChange} />
        <MoviesCardList onlyShort={onlyShort} foundMovies={foundMovies} moreButtonClicksCounter={moreButtonClicksCounter} showMoreButton={handleShowMoreButton} hideMoreButton={handleHideMoreButton} moreButtonStatus={showMoreButton} />
        <div className='saved-movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'} onClick={handleMoreButtonClick} moreButtonStatus={showMoreButton} />
        </div>
      </section>
      <Footer />
    </>
  )
};

export default SavedMovies;