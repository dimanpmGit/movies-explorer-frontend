import React, { useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const SavedMovies = ({ moviesSet }) => {
  return (
    <>
      <Header isMain={false} isAllMovies={false} isSavedMovies={true} />
      <section className='saved-movies'>
        <SearchForm />
        <MoviesCardList onlySaved={true} moviesSet={moviesSet} />
        <div className='saved-movies__divider'></div>
      </section>
      <Footer />
    </>
  )
};

export default SavedMovies;