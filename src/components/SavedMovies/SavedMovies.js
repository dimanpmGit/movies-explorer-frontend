import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ onlySaved }) => {
  return (
    <div className='saved-movies'>
      <Header />
      <SearchForm />
      <MoviesCardList onlySaved={onlySaved} />
      <div className='saved-movies__divider'></div>
      <Footer />
    </div>
  )
};

export default SavedMovies;