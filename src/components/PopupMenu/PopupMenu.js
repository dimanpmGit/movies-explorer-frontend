import React from 'react';
import { Link } from 'react-router-dom';
import './PopupMenu.css';

const PopupMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`popup-menu ${isOpen ? "popup-menu_is-opened" : ""}`}>
      <div className='popup-menu__container'>
        <button className='popup-menu__close-btn app__link' onClick={onClose}></button>
        <ul className='popup-menu__menu'>
          <li className='popup-menu__item'>
            <Link className='popup-menu__link app__link' to='/'>
              Главная
            </Link>
          </li>
          <li className='popup-menu__item'>
            <Link className='popup-menu__link app__link' to='/movies'>
              Фильмы
            </Link>
          </li>
          <li className='popup-menu__item'>
            <Link className='popup-menu__link app__link' to='/saved-movies'>
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link className='popup-menu__profile-link' to='/profile'>Аккаунт</Link>
      </div>
    </div>
  )
};

export default PopupMenu;