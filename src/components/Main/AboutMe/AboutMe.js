import React from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.css';
import studentPic from '../../../images/student.jpg';

const AboutMe = () => {
  return (
    <section className='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title main__title'>Студент</h2>
        <div className='about-me__info-block'>
          <div className='about-me__student-description'>
            <h3 className='about-me__student-name'>Дмитрий</h3>
            <p className='about-me__student-info'>Веб-разработчик, 41 год</p>
            <blockquote className='about-me__student-biography'>
              Я родился и живу в Новосибирске, закончил факультет прикладной математики и информатики НГТУ. У меня есть жена,
              сын, дочь и собака. Я люблю слушать музыку, а ещё увлекаюсь бегом. Решил структурировать знания и навыки в веб-разработке.
              С 2006 года работаю в компании АО «Райффайзенбанк». Пока еще прохожу курс веб-разработки.
            </blockquote>
            <Link className='about-me__github-link' to='https://github.com/dimanpmGit/movies-explorer-frontend' target="_blank" rel="noreferrer">Github</Link>
          </div>
          <img className='about-me__student-photo' src={studentPic} alt='vitalii' />
        </div>
      </div>
    </section>
  )
};

export default AboutMe;