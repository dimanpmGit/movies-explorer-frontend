import React from 'react';
import './AuthMenu.css';

const AuthMenu = () => {
  return (
    <ul className='authmenu'>
      <li className='authmenu__item'>
        Регистрация
      </li>
      <li className='authmenu__item'>
        Войти
      </li>
    </ul>
  )
};

export default AuthMenu;