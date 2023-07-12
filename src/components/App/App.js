import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import './App.css';
import PopupMenu from '../PopupMenu/PopupMenu';

function App() {
  const [isMain] = useState(true);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  function handleShowPopupBtnClick() {
    setIsPopupMenuOpen(true);
  }

  function closePopup() {
    setIsPopupMenuOpen(false);
  }

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main isMain={isMain}/>} />
        <Route path='/movies' element={<Movies onMenuClick={handleShowPopupBtnClick} onlySaved={false} />} />
        <Route path='/saved-movies' element={<SavedMovies onMenuClick={handleShowPopupBtnClick} onlySaved={true} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
      <PopupMenu isOpen={isPopupMenuOpen} onClose={closePopup} />
    </div>
  );
}

export default App;