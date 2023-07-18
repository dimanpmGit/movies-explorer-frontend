import React from 'react';
import './Footer.css';

const Footer = ({ isFooterNeeds }) => {
  return (
    <footer className={'footer'}>
      <div className='footer__container'>
        <h3 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className='footer__copyright-and-links'>
          <p className='footer__copyright'>&copy; 2023</p>
          <ul className='footer__links'>
            <li className='footer__item'>
              <a className='footer__link app__link' href='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__item'>
              <a className='footer__link app__link' href='https://github.com/dimanpmGit' target='_blank' rel='noreferrer'>
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
};

export default Footer;