import React, { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = ({ startPreloader, stopPreloader }) => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [moreButtonClicksCounter, setClicksCounter] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [onlyShort, setOnlyShort] = useState(false);

  const handleOnlyShortChange = () => {
    setOnlyShort(!onlyShort);
  }
  
  const handleMoreButtonClick = () => {
    setClicksCounter(moreButtonClicksCounter + 1);
  }

  const handleSearchClick = (movies) => {
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
      <section className='movies'>
        <SearchForm startPreloader={startPreloader}
          stopPreloader={stopPreloader} onSearchClick={handleSearchClick} onlyShort={onlyShort} handleOnlyShortChange={handleOnlyShortChange} />
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