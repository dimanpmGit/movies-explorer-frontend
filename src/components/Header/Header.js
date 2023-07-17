import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from './Navigation/Navigation';
import AuthMenu from './AuthMenu/AuthMenu';

const Header = ({ isMain, onMenuClick, isNoHeader, isSavedMovies }) => {
  return (
    <header className={`header${isMain ? " header_main" : ""}${isNoHeader ? " header_none" : ""}`}>
      <div className='header__container'>
        <Logo />
        <div className='header__menu'>
          {isMain ? <AuthMenu /> : <Navigation onMenuClick={onMenuClick} isSavedMovies={isSavedMovies} />}
        </div>
      </div>
    </header>
  )
};

export default Header;