import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__links'>
          <li className='portfolio__item'>
            <Link className='portfolio__link app__link' to='https://dimanpmgit.github.io/russian-travel/' target='_blank' rel='noreferrer'>Статичный сайт</Link>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link app__link' to='https://dimanpmgit.github.io/russian-travel/' target='_blank' rel='noreferrer'>Адаптивный сайт</Link>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link app__link' to='https://dimanpmgit.github.io/mesto/' target='_blank' rel='noreferrer'>Одностраничное приложение</Link>
          </li>
        </ul>
      </div>
    </section>
  )
};

export default Portfolio;