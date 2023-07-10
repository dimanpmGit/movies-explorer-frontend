import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <div className='techs'>
      <div className='techs__container'>
        <h2 className='techs__title main__title'>Технологии</h2>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <p className='techs__description'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__technologies'>
          <li className='techs__technologies-item'>
            HTML
          </li>
          <li className='techs__technologies-item'>
            CSS
          </li>
          <li className='techs__technologies-item'>
            JS
          </li>
          <li className='techs__technologies-item'>
            React
          </li>
          <li className='techs__technologies-item'>
            Git
          </li>
          <li className='techs__technologies-item'>
            Express.js
          </li>
          <li className='techs__technologies-item'>
            mongoDB
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Techs;