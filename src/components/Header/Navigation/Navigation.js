import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isMain, onMenuClick, isAllMovies, isSavedMovies }) => {
  return (
    <div className='navigation'>
      <div className='navigation__wrapper'>
        <ul className='navigation__films'>
          <li className='navigation__item'>
            <Link className={`navigation__item-link ${isAllMovies ? 'navigation__item-link_active ' : ''}app__link`} to='/movies'>
              Фильмы
            </Link>
          </li>
          <li className='navigation__item'>
            <Link className={`navigation__item-link ${isSavedMovies ? 'navigation__item-link_active ' : ''}app__link`} to='/saved-movies'>
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link className='navigation__profile-link' to='/profile'>
          <p className='navigation__profile-text'>Аккаунт</p>
          <div className={`navigation__profile-picture ${!isMain ? 'navigation__profile-picture_not-main' : ''}`} ></div>
        </Link>
      </div>
      <button className='navigation__hamburger' type='button' onClick={onMenuClick}></button>
    </div>
  )
};

export default Navigation;