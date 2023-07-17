import React, { useEffect } from 'react';
import './NotFound.css';

const NotFound = ({ setIsNoHeader, setFooterDoesNotNeed }) => {
  useEffect(() => {

  })
  setIsNoHeader();
  setFooterDoesNotNeed();
  return (
    <section className='not-found'>
      <h2 className='not-found__err-code'>404</h2>
      <p className='not-found__err-description'>
        Страница не найдена
      </p>
      <a className='not-found__back-link app__link' href='javascript: history.back()'>
        Назад
      </a>
    </section>
  )
};

export default NotFound;