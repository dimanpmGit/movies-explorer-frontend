import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__links'>
          <li className='portfolio__item'>
            <a className='portfolio__link app__link' href='https://dimanpmgit.github.io/russian-travel/' target='_blank'>Статичный сайт</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link app__link' href='https://dimanpmgit.github.io/russian-travel/' target='_blank'>Адаптивный сайт</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link app__link' href='https://dimanpmgit.github.io/mesto/' target='_blank'>Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Portfolio;