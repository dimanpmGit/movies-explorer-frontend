import React, { useState } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from './Navigation/Navigation';
import AuthMenu from './AuthMenu/AuthMenu';
import PopupMenu from '../PopupMenu/PopupMenu';

const Header = ({ loggedIn, isMain, isAllMovies, isSavedMovies }) => {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const showPopup = () => {
    setIsPopupMenuOpen(true);
  }

  const closePopup = () => {
    setIsPopupMenuOpen(false);
  }

  return (
    <>
      <header className={`header${isMain ? " header_main" : ""}`}>
        <div className='header__container'>
          <Logo />
          <div className='header__menu'>
            {!loggedIn ? <AuthMenu /> : <Navigation isMain={isMain} onMenuClick={showPopup} isAllMovies={isAllMovies} isSavedMovies={isSavedMovies} />}
          </div>
        </div>
      </header>
      <PopupMenu isOpen={isPopupMenuOpen} onClose={closePopup} />
    </>
  )
};

export default Header;