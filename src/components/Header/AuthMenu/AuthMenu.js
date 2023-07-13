import React from 'react';
import './AuthMenu.css';

const AuthMenu = () => {
  return (
    <ul className='auth-menu'>
      <li className='auth-menu__item'>
        <a className='auth-menu__link' href='/signup'>Регистрация</a>
      </li>
      <li className='auth-menu__item'>
        <a className='auth-menu__link' href='/signin'>Войти</a>
      </li>
    </ul>
  )
};

export default AuthMenu;