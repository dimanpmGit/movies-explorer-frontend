import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
//import { Helmet } from 'react-helmet';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';
import PopupMenu from '../PopupMenu/PopupMenu';
import * as auth from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [isMain, setIsMain] = useState(true);
  const [isOnlySaved, setIsOnlySaved] = useState(false);
  const [noHeader, setNoHeader] = useState(false);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isFooterNeeds, setIsFooterNeeds] = useState(true);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            handleLogin();
            //const url = location.state?.returnUrl || '/';
            const url = location.pathname || '/movies';
            navigate(url, { replace: true });
            //navigate('/movies', { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    document.title = 'Movies explorer';
    document.documentElement.setAttribute('lang', 'ru');
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);
  
  const handleShowPopupBtnClick = () => {
    setIsPopupMenuOpen(true);
  }

  const closePopup = () => {
    setIsPopupMenuOpen(false);
  }

  const setMainPage = () => {
    setIsMain(true);
  }

  const setNotMainPage = () => {
    setIsMain(false);
  }

  const setWithHeader = () => {
    setNoHeader(false);
  }
  const setWithoutHeader = () => {
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
      <Header 
        isMain={isMain}
        onMenuClick={handleShowPopupBtnClick}
        noHeader={noHeader}
        isSavedMovies={isOnlySaved}
      />
      <Routes>
        <Route path='/signin' element={
          <Login
            loggedIn={loggedIn}
            formValue={formValue}
            setFormValue={setFormValue}
            handleLogin={handleLogin}
            setNoHeader={setWithoutHeader}
            noHeader={noHeader}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
            isFooterNeeds={isFooterNeeds}
          />}
        />
        <Route path='/signup' element={
          <Register
            loggedIn={loggedIn}
            formValue={formValue}
            setFormValue={setFormValue}
            handleLogin={handleLogin}
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
        <Route 
          path='/movies' 
          element={
            <ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
              onMenuClick={handleShowPopupBtnClick}
              setAllMovies={setAllMovies}
              onlySaved={isOnlySaved}
              notMain={setNotMainPage}
              setWithHeader={setWithHeader}
              setFooterNeeds={setFooterNeeds}
            />}
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={loggedIn}
              onMenuClick={handleShowPopupBtnClick}
              setOnlySavedMovies={setOnlySaved}
              onlySaved={isOnlySaved}
              notMain={setNotMainPage}
              setWithHeader={setWithHeader}
              setFooterNeeds={setFooterNeeds}
            />}
        />
        <Route 
          path='profile'
          element={
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              notMain={setNotMainPage}
              getProfileEdit={handleEditProfileClick}
              saveProfile={handleSaveProfileClick}
              isProfileEdit={isProfileEdit}
              setFooterDoesNotNeed={setFooterDoesNotNeed}
              setWithHeader={setWithHeader}
            />}
        />
        <Route path='/' element={
          loggedIn ? <Navigate to='/movies' /> :
            <Navigate to='/main' />
        } />
        <Route path='/main' element={
          <Main isMain={setMainPage}
          />}
        />
      </Routes>
      <Footer isFooterNeeds={isFooterNeeds}/>
      <PopupMenu isOpen={isPopupMenuOpen} onClose={closePopup} />
    </div>
  );
}

export default App;