import React, {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { SHORT_MOVIES_LIMIT } from '../../utils/constants';

const MoviesCardList = ({ onlyShort, foundMovies, moreButtonClicksCounter, showMoreButton, hideMoreButton, moreButtonStatus }) => {
  const [cardsOnPage, setCardsOnPage] = useState(0);
  const [shortMovies, setShortMovies] = useState([]);
  
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
    }, []);

    return cardsPerPage;
  }
  const { cardsPerPage, cardsOnMoreButton} = useCardsPerPage();

  const getCountCardsOnPage = (foundMovies, addMoviesByClick, cliksCounter, maxCardsOnPage) => {
    const maxOnPage = maxCardsOnPage + (addMoviesByClick * cliksCounter);
    //const maxOnPage = maxMoviesOnPage + cardsOnPage;
    if (foundMovies > maxOnPage) {
      showMoreButton();
      //setCardsOnPage(maxOnPage);
      return maxOnPage;
    }
    hideMoreButton();
    //setCardsOnPage(foundMovies);
    return foundMovies;
  }

  const getShortMovies = (foundMovies) => {
    return foundMovies.filter((movie) => movie.duration < SHORT_MOVIES_LIMIT);
  }
  useEffect(() => {
    setShortMovies(getShortMovies(foundMovies));
  }, [onlyShort]);

  useEffect(() => {
    onlyShort ?
      setCardsOnPage(getCountCardsOnPage(shortMovies.length, cardsOnMoreButton, moreButtonClicksCounter, cardsPerPage))
      :
      setCardsOnPage(getCountCardsOnPage(foundMovies.length, cardsOnMoreButton, moreButtonClicksCounter, cardsPerPage));
  }, [onlyShort, moreButtonClicksCounter, cardsOnPage, foundMovies.length, shortMovies.length])



  
/*
  console.log(`Добавляется карточек при нажатии кнопки [Ещё]: ${cardsOnMoreButton}`);
  console.log(`Найдено фильмов: ${foundMovies.length}`);
  console.log(`Максимум карточек на странице при первой загрузке: ${cardsPerPage}`);
  console.log(`Кнопка [Ещё] нажата ${moreButtonClicksCounter} раз`);
  console.log(`Показано карточек: ${getCountCardsOnPage(foundMovies.length, cardsOnMoreButton, moreButtonClicksCounter, cardsPerPage)}`);
  console.log(`Показывать кнопку [Ещё]? ${moreButtonStatus}`);*/
  console.log(`Показано карточек: ${cardsOnPage}`);
  console.log(`onlyShort: ${onlyShort}`);
  console.log(shortMovies);
  if (onlyShort) 
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {/*cards.map((card, i) => (
          card.saved ? <MoviesCard key={i} card={card} onlySaved={onlySaved} /> : ''
        ))*/
          shortMovies.length > 0 &&
          /*[...Array((foundMovies.length < cardsPerPage ? foundMovies.length : cardsPerPage))].map((movie, i) => <MoviesCard key={foundMovies[i].id} movie={foundMovies[i]} />)*/
          [...Array(cardsOnPage)].map((movie, i) => <MoviesCard key={shortMovies[i].id} movie={shortMovies[i]} />)
        }
      </div>
    </div>
  )
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {
          foundMovies.length > 0 &&
          /*[...Array((foundMovies.length < cardsPerPage ? foundMovies.length : cardsPerPage))].map((movie, i) => <MoviesCard key={foundMovies[i].id} movie={foundMovies[i]} />)*/
          [...Array(cardsOnPage)].map((movie, i) => <MoviesCard key={foundMovies[i].id} movie={foundMovies[i]} />)
        }
      </div>
    </div>
  )
};

export default MoviesCardList;