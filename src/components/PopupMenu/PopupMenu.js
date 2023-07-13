import React from 'react';
import './PopupMenu.css';

const PopupMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`popup-menu ${isOpen ? "popup-menu_is-opened" : ""}`}>
      <div className='popup-menu__container'>
        <button className='popup-menu__close-btn app__link' onClick={onClose}></button>
        <ul className='popup-menu__menu'>
          <li className='popup-menu__item'>
            <a className='popup-menu__link app__link' href='/'>
              Главная
            </a>
          </li>
          <li className='popup-menu__item'>
            <a className='popup-menu__link app__link' href='/movies'>
              Фильмы
            </a>
          </li>
          <li className='popup-menu__item'>
            <a className='popup-menu__link app__link' href='/saved-movies'>
              Сохранённые фильмы
            </a>
          </li>
        </ul>
        <a className='popup-menu__profile-link' href='/profile'>Аккаунт</a>
      </div>
    </div>
  )
};

export default PopupMenu;