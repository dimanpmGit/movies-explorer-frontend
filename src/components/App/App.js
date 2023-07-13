import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './App.css';
import PopupMenu from '../PopupMenu/PopupMenu';

function App() {
  const [isMain, setIsMain] = useState(true);
  const [isOnlySaved, setIsOnlySaved] = useState(false);
  const [noHeader, setNoHeader] = useState(false);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isFooterNeeds, setIsFooterNeeds] = useState(true);
  
  function handleShowPopupBtnClick() {
    setIsPopupMenuOpen(true);
  }

  function closePopup() {
    setIsPopupMenuOpen(false);
  }

  function setMainPage() {
    setIsMain(true);
  }

  function setNotMainPage() {
    setIsMain(false);
  }

  function setWithoutHeader() {
    setNoHeader(true);
  }

  const setOnlySaved = () => {
    return setIsOnlySaved(true);
  }

  const setAllMovies = () => {
    return setIsOnlySaved(false);
  }

  const handleEditProfileClick = () => {
    setIsProfileEdit(true);
  }

  const handleSaveProfileClick = () => {
    setIsProfileEdit(false);
  }

  const setFooterNeeds = () => {
    setIsFooterNeeds(true);
  }

  const setFooterDoesNotNeed = () => {
    setIsFooterNeeds(false);
  }
  
  return (
    <div className='app'>
      <Helmet>
        <title>Movies explorer</title>
        <html lang="ru" />
      </Helmet>
      <Header 
        isMain={isMain}
        onMenuClick={handleShowPopupBtnClick}
        noHeader={noHeader}
        isSavedMovies={isOnlySaved}
      />
      <Routes>
        <Route path='/' element={
          <Main isMain={setMainPage}
          />}
        />
        <Route path='/movies' element={
          <Movies
            onMenuClick={handleShowPopupBtnClick}
            setAllMovies={setAllMovies}
            onlySaved={isOnlySaved}
            notMain={setNotMainPage}
          />
        } />
        <Route path='/saved-movies' element={
          <SavedMovies
            onMenuClick={handleShowPopupBtnClick}
            setOnlySavedMovies={setOnlySaved}
            onlySaved={isOnlySaved}
            notMain={setNotMainPage}
          />
        }/>
        <Route path='/profile' element={
          <Profile 
            notMain={setNotMainPage}
            getProfileEdit={handleEditProfileClick}
            saveProfile={handleSaveProfileClick}
            isProfileEdit={isProfileEdit}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
          />
        }/>
        <Route path='/signin' element={
          <Login 
            setNoHeader={setWithoutHeader}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
          />}
        />
        <Route path='/signup' element={
          <Register 
            setNoHeader={setWithoutHeader}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
          />}
        />
        <Route path='/not-found' element={
          <NotFound 
            setNoHeader={setWithoutHeader}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
          />}
        />
      </Routes>
      <Footer isFooterNeeds={isFooterNeeds}/>
      <PopupMenu isOpen={isPopupMenuOpen} onClose={closePopup} />
    </div>
  );
}

export default App;