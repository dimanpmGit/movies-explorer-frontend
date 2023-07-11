import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthMenu from '../AuthMenu/AuthMenu';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__container'>
      <Logo />
      <div className='header__menu'>
        <AuthMenu />
        {/*<Navigation />*/}
      </div>
    </div>
    </div>
  )
};

export default Header;