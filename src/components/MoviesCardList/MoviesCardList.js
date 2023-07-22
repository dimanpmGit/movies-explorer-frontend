import React, {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { SHORT_MOVIES_LIMIT } from '../../utils/constants';

const MoviesCardList = ({ onlyShort, foundMovies, moreButtonClicksCounter, showMoreButton, hideMoreButton }) => {
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

  const getCountCardsOnPage = (foundMovies, addMoviesByClick, cliksCounter, maxCardsOnPage, cardsOnPage) => {
    const maxOnPage = maxCardsOnPage + (addMoviesByClick * cliksCounter);
    /*if (!cardsOnPage) { 
      cardsOnPage = 0
    };*/
    //const maxOnPage = maxCardsOnPage + Math.floor((cardsOnPage / addMoviesByClick) * addMoviesByClick);
    /*if ((cardsOnPage > 0) && (cardsOnPage > maxOnPage)) {
      showMoreButton();
      return maxCardsOnPage + (addMoviesByClick * Math.floor(cardsOnPage, maxOnPage));
    }
    if ((cardsOnPage > 0) && (cardsOnPage < maxOnPage)) {
      if (foundMovies > maxOnPage) {
        showMoreButton();
        return maxCardsOnPage + addMoviesByClick;
      }
      hideMoreButton();
      return foundMovies;
    }
    else 
    console.log('*******************************************************************');
    console.log(`Найдено фильмов: ${foundMovies}`);
    console.log(`Добавляется фильмов за клик: ${addMoviesByClick}`);
    console.log(`Нажатий кнопки [Ещё]: ${cliksCounter}`);
    console.log(`Максимум карточек на странице: ${maxCardsOnPage}`);
    console.log(`Карточек на странице: ${cardsOnPage}`);
    //maxCardsOnPage = cardsOnPage + addMoviesByClick;
    console.log(`Math.floor((cardsOnPage / addMoviesByClick)): ${Math.floor((cardsOnPage / addMoviesByClick) * addMoviesByClick) }`);
    console.log(`Максимум карточек на странице: ${cardsOnPage > maxCardsOnPage ? (Math.floor(cardsOnPage / addMoviesByClick) * addMoviesByClick) : maxCardsOnPage}`);*/
    /*if (foundMovies > maxOnPage) {
      if (cardsOnPage > maxOnPage) {
        showMoreButton();
        return (Math.floor(cardsOnPage / addMoviesByClick) * addMoviesByClick);
      }
      showMoreButton();
      return maxOnPage;
    }
    else {
      hideMoreButton();
      return foundMovies;
    }*/

    if (foundMovies > maxOnPage) {
      showMoreButton();
      return maxOnPage;
    }
    else {
      hideMoreButton();
      return foundMovies;
    }
  }

  const getShortMovies = (foundMovies) => {
    return foundMovies.filter((movie) => movie.duration < SHORT_MOVIES_LIMIT);
  }
  useEffect(() => {
    setShortMovies(getShortMovies(foundMovies));
  }, [onlyShort, foundMovies]);

  useEffect(() => {
    onlyShort ?
      setCardsOnPage(getCountCardsOnPage(shortMovies.length, cardsOnMoreButton, moreButtonClicksCounter, cardsPerPage, cardsOnPage))
      :
      setCardsOnPage(getCountCardsOnPage(foundMovies.length, cardsOnMoreButton, moreButtonClicksCounter, cardsPerPage, cardsOnPage));
  }, [onlyShort, moreButtonClicksCounter, cardsOnPage, foundMovies, shortMovies])



  
/*
  console.log(`Добавляется карточек при нажатии кнопки [Ещё]: ${cardsOnMoreButton}`);
  console.log(`Найдено фильмов: ${foundMovies.length}`);
  console.log(`Максимум карточек на странице при первой загрузке: ${cardsPerPage}`);
  console.log(`Кнопка [Ещё] нажата ${moreButtonClicksCounter} раз`);
  console.log(`Показано карточек: ${getCountCardsOnPage(foundMovies.length, cardsOnMoreButton, moreButtonClicksCounter, cardsPerPage)}`);
  console.log(`Показывать кнопку [Ещё]? ${moreButtonStatus}`);
  
  console.log(`Показано карточек: ${cardsOnPage}`);
  
  console.log(`onlyShort: ${onlyShort}`);
  console.log('shortMovies: ');
  console.log(shortMovies);
  console.log('foundMovies: ');
  console.log(foundMovies);
  */
  if (onlyShort) 
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {
          shortMovies.length > 0 && shortMovies.length >= cardsOnPage &&
            [...Array(cardsOnPage)].map((movie, i) => <MoviesCard key={shortMovies[i].id} movie={shortMovies[i]} />)
        }
      </div>
    </div>
  )
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {
          foundMovies.length > 0 && foundMovies.length >= cardsOnPage &&
            [...Array(cardsOnPage)].map((movie, i) => <MoviesCard key={foundMovies[i].id} movie={foundMovies[i]} />)
        }
      </div>
    </div>
  )
};

export default MoviesCardList;