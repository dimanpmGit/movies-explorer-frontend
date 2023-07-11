import React from 'react';
import './SavedMovies.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = (props) => {
  return (
    <div className='saved-movies'>
      <Header />
      <SearchForm />
      <div className='saved-movies__container'>
        <MoviesCard allMovies={props.allMovies} />
      </div>
      <div className='saved-movies__divider'></div>
      <Footer />
    </div>
  )
};

export default SavedMovies;