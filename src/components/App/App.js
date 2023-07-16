import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import * as auth from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    name: '',
  });
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        setLoggedIn(true);
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formValue;
    auth.register(name, email, password)
      .then((res) => {
        setLoggedIn(true);
        console.log(res);
      })
      .catch(err => console.log(err));
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
        <Route 
          path='/movies' 
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Movies}
              onMenuClick={handleShowPopupBtnClick}
              setAllMovies={setAllMovies}
              onlySaved={isOnlySaved}
              notMain={setNotMainPage}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={SavedMovies}
              onMenuClick={handleShowPopupBtnClick}
              setOnlySavedMovies={setOnlySaved}
              onlySaved={isOnlySaved}
              notMain={setNotMainPage}
            />
          }
        />
        <Route 
          path='profile'
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Profile}
              notMain={setNotMainPage}
              getProfileEdit={handleEditProfileClick}
              saveProfile={handleSaveProfileClick}
              isProfileEdit={isProfileEdit}
              setFooterDoesNotNeed={setFooterDoesNotNeed}
            />
          }
        />
        <Route path='/' element={
          loggedIn ? <Navigate to='/movies' replace /> :
          <Navigate  to='/signin' replace />
        } />
        <Route path='/signin' element={
          <Login
            handleChange={handleChange}
            handleSubmit={handleLoginSubmit}
            formValue={formValue}
            setNoHeader={setWithoutHeader}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
          />}
        />
        <Route path='/signup' element={
          <Register 
            handleChange={handleChange}
            handleSubmit={handleRegisterSubmit}
            formValue={formValue}
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