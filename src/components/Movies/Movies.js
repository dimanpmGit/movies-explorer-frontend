import React, { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = ({ startPreloader, stopPreloader }) => {
  const [foundMovies, setFoundMovies] = useState([]);

  const handleSetFoundMovies = (movies) => {
    setFoundMovies([]);
    const moviesArr = Array.from(movies);
    moviesArr.map((movie) => {
      return setFoundMovies(foundMovies => [...[...new Set(foundMovies)], movie]);
    })
  }
  return (
    <>
      <Header isMain={false} isAllMovies={true} />
      <section className='movies'>
        <SearchForm startPreloader={startPreloader}
          stopPreloader={stopPreloader} handleSetFoundMovies={handleSetFoundMovies} />
        <MoviesCardList onlySaved={false} moviesSet={foundMovies} />
        <div className='movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'}/>
        </div>
      </section>
      <Footer />
    </>
  )
};

export default Movies;