import React from 'react';
import './SavedMovies.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = () => {
  return (
    <div className='saved-movies'>
      <Header />
      <SearchForm />
      <div className='saved-movies__container'>
        <MoviesCard />
      </div>
      <div className='saved-movies__devider'></div>
      <Footer />
    </div>
  )
};

export default SavedMovies;