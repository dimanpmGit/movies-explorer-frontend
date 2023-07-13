import React from 'react';
import './Navigation.css';

const Navigation = ({ onMenuClick }) => {
  return (
    <div className='navigation'>
      <div className='navigation__wrapper'>
        <ul className='navigation__films'>
          <li className='navigation__item'>
            <a className='navigation__item-link navigation__item-link_active app__link' href='/movies'>
              Фильмы
            </a>
          </li>
          <li className='navigation__item'>
            <a className='navigation__item-link app__link' href='/saved-movies'>
              Сохранённые фильмы
            </a>
          </li>
        </ul>
        <a className='navigation__profile-link' href='/profile'>Аккаунт</a>
      </div>
      <button className='navigation__hamburger' type='button' onClick={onMenuClick}></button>
    </div>
  )
};

export default Navigation;