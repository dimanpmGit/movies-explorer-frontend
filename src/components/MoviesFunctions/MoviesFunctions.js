import React from 'react';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

export const MoviesFunctions = () => {
  return (
    <>
    </>
  )
}

  export const getAllMovies = (value) => {
    moviesApi.getMovies()
      .then((data) => {
        if (data) {
          const moviesArr = Array.from(data);
          //Сохраняем данные поиска в локальное хранилище
          localStorage.setItem('movies', JSON.stringify(moviesArr));
          return data;
        }
      })
      .catch(err => console.log(err));
  }

export const getSavedMovies = ({ startPreloader, stopPreloader }) => {
  let moviesArr = [];
  startPreloader();
  mainApi.getSavedMovies()
    .then((data) => {
      stopPreloader();
      if (data) {
        moviesArr = Array.from(data);
        //Сохраняем данные поиска в локальное хранилище

        /*localStorage.setItem('saved-movies', JSON.stringify(moviesArr));
        moviesArr.map((movie) => {
          return setSavedMoviesSet(savedMoviesSet => [...[...new Set(savedMoviesSet)],
            movie]);
        });*/
        return moviesArr;
      }
    })
    .catch(err => console.log(err));
  console.log(moviesArr);
}

  const _saveMovie = (movie) => {
    return mainApi.saveMovie(movie)
      .then((data) => {
        
      })
      .catch(err => console.log(err));
  }

  const _deleteMovie = (id) => {
    return mainApi.deleteMovie(id)
      .then((data) => {
        
      })
      .catch(err => console.log(err));
  }