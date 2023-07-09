import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthMenu from '../AuthMenu/AuthMenu';

const Header = () => {
  return (
    <div className='header'>
      <Logo />
      <div className='header__menu'>
        <Navigation />
        <AuthMenu />
      </div>
    </div>
  )
};

export default Header;