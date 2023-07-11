import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';

const Movies = (props) => {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList allMovies={props.allMovies} />
      <MoreButton />
      <Footer />
    </>
  )
};

export default Movies;