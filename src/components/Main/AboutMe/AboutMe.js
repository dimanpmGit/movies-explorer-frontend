import React from 'react';
import './AboutMe.css';
import { studentPhoto } from '../../../utils/constants';

const AboutMe = () => {
  return (
    <div className='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title main__title'>Студент</h2>
        <div className='about-me__info-block'>
          <dvi className='about-me__student-description'>
            <h3 className='about-me__student-name'>Виталий</h3>
            <p className='about-me__student-info'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__student-biography'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className='about-me__github-link' href='https://github.com/dimanpmGit/movies-explorer-frontend' target="_blank" rel="noreferrer">Github</a>
          </dvi>
          <img className='about-me__student-photo' src={studentPhoto} alt='vitalii' />
        </div>
      </div>
    </div>
  )
};

export default AboutMe;