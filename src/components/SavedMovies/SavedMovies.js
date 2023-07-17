import React, { useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ setOnlySavedMovies, notMain, onlySaved, setWithHeader, setFooterNeeds }) => {
  useEffect(() => {
    notMain();
    setOnlySavedMovies();
    setWithHeader();
    setFooterNeeds();
  },[])
  
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList onlySaved={onlySaved} />
      <div className='saved-movies__divider'></div>
    </section>
  )
};

export default SavedMovies;