import React from 'react';
import './AuthMenu.css';

const AuthMenu = () => {
  return (
    <ul className='authmenu'>
      <li className='authmenu__item'>
        <a className='authmenu__link' href='/signup'>Регистрация</a>
      </li>
      <li className='authmenu__item'>
        <a className='authmenu__link' href='/signin'>Войти</a>
      </li>
    </ul>
  )
};

export default AuthMenu;