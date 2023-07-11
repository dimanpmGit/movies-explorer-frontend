import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__links'>
          <li className='portfolio__item'>
            <a className='portfolio__link app__link' href='/'>Статичный сайт</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link app__link' href='/'>Адаптивный сайт</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link app__link' href='/'>Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Portfolio;