import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className='about-project'>
      <div className='about-project__container'>
        <h2 className='about-project__title main__title'>О проекте</h2>
        <ul className='about-project__description'>
          <li className='about-project__item'>
            <h3 className='about-project__item-title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about-project__item-text'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>
          <li>
            <h3 className='about-project__item-title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about-project__item-text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className='about-project__periods'>
          <p className='about-project__periods-1stweek'>
            1 неделя
          </p>
          <p className='about-project__periods-4weeks'>
            4 недели
          </p>
          <p className='about-project__periods-text'>
            Back-end
          </p>
          <p className='about-project__periods-text'>
            Front-end
          </p>
        </div>
      </div>
    </div>
  )
};

export default AboutProject;