import React, {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import * as mainApi from '../../utils/MainApi';

const MoviesCardList = ({ foundMovies, moreButtonClicksCounter, showMoreButton, hideMoreButton, isSaved, startPreloader, stopPreloader, handleDeleteClick }) => {
  const [cardsOnPage, setCardsOnPage] = useState(0);
  const getCardsPerPage = () => {
    const { innerWidth: width, innerHeight: height } = window;
    let cardsPerPage = 0;
    let cardsOnMoreButton = 0;

    if (width > 1155) {
      cardsPerPage = 12;
      cardsOnMoreButton = 3;
    }
    else if ((width <= 1155) && (width > 640)) {
      cardsPerPage = 8;
      cardsOnMoreButton = 2;
    }
    else if (width <= 640) {
      cardsPerPage = 6;
      cardsOnMoreButton = 1;
    }
    return {
      width,
      height,
      cardsPerPage,
      cardsOnMoreButton
    };
  }

  const useCardsPerPage = () => {
    const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

    useEffect(() => {
      const handleResize = () => {
        setCardsPerPage(getCardsPerPage());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [cardsPerPage]);

    return cardsPerPage;
  }
  const { cardsPerPage, cardsOnMoreButton} = useCardsPerPage();

  const getCountCardsOnPage = (foundMovies, addMoviesByClick, cliksCounter, maxCardsOnPage) => {
    const maxOnPage = maxCardsOnPage + (addMoviesByClick * cliksCounter);
    if (foundMovies > maxOnPage) {
      showMoreButton();
      return maxOnPage;
    }
    else {
      hideMoreButton();
      return foundMovies;
    }
  }

  useEffect(() => {
    setCardsOnPage(getCountCardsOnPage(foundMovies.length, cardsOnMoreButton, moreButtonClicksCounter, cardsPerPage, cardsOnPage));
  }, [moreButtonClicksCounter, cardsOnPage, foundMovies]);

  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {
          foundMovies.length > 0 && foundMovies.length >= cardsOnPage &&
          [...Array(cardsOnPage)].map((movie, i) => <MoviesCard key={foundMovies[i].id || foundMovies[i].likedMovieId} movie={foundMovies[i]} isSaved={isSaved} startPreloader={startPreloader} stopPreloader={stopPreloader} handleDeleteClick={handleDeleteClick} />)
        }
      </div>
    </div>
  )
};

export default MoviesCardList;