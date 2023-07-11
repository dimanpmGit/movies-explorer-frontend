import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className='navigation'>
      <ul className='navigation__films'>
        <li className='navigation__item navigation__item_active app__link'>
          Фильмы
        </li>
        <li className='navigation__item app__link'>
          Сохранённые фильмы
        </li>
      </ul>
      <a className='navigation__profile-link app__link' href='/'>Аккаунт</a>
    </div>
  )
};

export default Navigation;