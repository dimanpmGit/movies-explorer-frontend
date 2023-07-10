import React from 'react';
import './Promo.css';
import promoImg from '../../../images/text__COLOR_landing-logo.svg';

const Promo = () => {
  return (
    <div className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className='promo__image' src={promoImg} alt='Учебный проект студента факультета Веб-разработки'/>
      </div>
    </div>
  )
};

export default Promo;