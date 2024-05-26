import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate(-1);
  }
  return (
    <section className='not-found'>
      <h2 className='not-found__err-code'>404</h2>
      <p className='not-found__err-description'>
        Страница не найдена
      </p>
      <button className='not-found__back-link app__link' onClick={handleBackBtn}>
        Назад
      </button>
    </section>
  )
};

export default NotFound;