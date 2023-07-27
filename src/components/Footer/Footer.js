import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
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
              <Link className='footer__link app__link' to='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>
                Яндекс.Практикум
              </Link>
            </li>
            <li className='footer__item'>
              <Link className='footer__link app__link' to='https://github.com/dimanpmGit' target='_blank' rel='noreferrer'>
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
};

export default Footer;