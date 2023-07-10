import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className='navigation'>
      <ul className='navigation__films'>
        <li className='navigation__item navigation__item_active'>
          Фильмы
        </li>
        <li className='navigation__item'>
          Сохранённые фильмы
        </li>
      </ul>
      <a className='navigation__profile-link' href='/'>Аккаунт</a>
    </div>
  )
};

export default Navigation;