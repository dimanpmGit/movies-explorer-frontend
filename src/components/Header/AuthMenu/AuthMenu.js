import React from 'react';
import { Link } from 'react-router-dom';
import './AuthMenu.css';

const AuthMenu = () => {
  return (
    <ul className='auth-menu'>
      <li className='auth-menu__item'>
        <Link className='auth-menu__link' to='/signup'>Регистрация</Link>
      </li>
      <li className='auth-menu__item'>
        <Link className='auth-menu__link' to='/signin'>Войти</Link>
      </li>
    </ul>
  )
};

export default AuthMenu;