import React from 'react';
import './AboutMe.css';
import { studentPic } from '../../../utils/constants';

const AboutMe = () => {
  return (
    <section className='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title main__title'>Студент</h2>
        <div className='about-me__info-block'>
          <div className='about-me__student-description'>
            <h3 className='about-me__student-name'>Виталий</h3>
            <p className='about-me__student-info'>Фронтенд-разработчик, 30 лет</p>
            <blockquote className='about-me__student-biography'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </blockquote>
            <a className='about-me__github-link' href='https://github.com/dimanpmGit/movies-explorer-frontend' target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className='about-me__student-photo' src={studentPic} alt='vitalii' />
        </div>
      </div>
    </section>
  )
};

export default AboutMe;