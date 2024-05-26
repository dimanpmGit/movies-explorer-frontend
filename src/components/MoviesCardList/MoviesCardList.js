import React, {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { 
  BIG_SCREEN_RESOLUTION,
  SMALL_SCREEN_RESOLUTION,
  CARDS_ON_BIG_SCREEN,
  CARDS_ON_MEDIUM_SCREEN,
  CARDS_ON_SMALL_SCREEN,
  CARDS_ON_BIG_SCREEN_BY_MORE_BTN,
  CARDS_ON_MEDIUM_SCREEN_BY_MORE_BTN,
  CARDS_ON_SMALL_SCREEN_BY_MORE_BTN
} from '../../utils/constants';

const MoviesCardList = ({ foundMovies, moreButtonClicksCounter, showMoreButton, hideMoreButton, isSaved, startPreloader, stopPreloader, handleDeleteClick }) => {
  const [cardsOnPage, setCardsOnPage] = useState(0);
  const getCardsPerPage = () => {
    const { innerWidth: width, innerHeight: height } = window;
    let cardsPerPage = 0;
    let cardsOnMoreButton = 0;

    if (width > BIG_SCREEN_RESOLUTION) {
      cardsPerPage = CARDS_ON_BIG_SCREEN;
      cardsOnMoreButton = CARDS_ON_BIG_SCREEN_BY_MORE_BTN;
    }
    else if ((width <= BIG_SCREEN_RESOLUTION) && (width > SMALL_SCREEN_RESOLUTION)) {
      cardsPerPage = CARDS_ON_MEDIUM_SCREEN;
      cardsOnMoreButton = CARDS_ON_MEDIUM_SCREEN_BY_MORE_BTN;
    }
    else if (width <= SMALL_SCREEN_RESOLUTION) {
      cardsPerPage = CARDS_ON_SMALL_SCREEN;
      cardsOnMoreButton = CARDS_ON_SMALL_SCREEN_BY_MORE_BTN;
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
          [...Array(cardsOnPage)].map((movie, i) => <MoviesCard key={foundMovies[i].id || foundMovies[i].likedMovieId} movie={foundMovies[i]} moviesSet={foundMovies} isSaved={isSaved} startPreloader={startPreloader} stopPreloader={stopPreloader} handleDeleteClick={handleDeleteClick} />)
        }
      </div>
    </div>
  )
};

export default MoviesCardList;