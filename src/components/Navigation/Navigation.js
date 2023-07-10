import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <ul className='navigation'>
      <li className='navigation__item'>
        Фильмы
      </li>
      <li className='navigation__item'>
        Сохранённые фильмы
      </li>
    </ul>
  )
};

export default Navigation;