import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Buttons/MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = ({ loggedIn, moviesSet }) => {
  return (
    <>
      <Header isMain={false} isAllMovies={true} />
      <section className='movies'>
        <SearchForm />
        <MoviesCardList onlySaved={false} moviesSet={moviesSet} />
        <div className='movies__more-btn-wrapper'>
          <MoreButton text={'Ещё'}/>
        </div>
      </section>
      <Footer />
    </>
  )
};

export default Movies;