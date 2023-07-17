import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
import Preloader from '../Preloader/Preloader';

import './App.css';
import PopupMenu from '../PopupMenu/PopupMenu';
import * as auth from '../../utils/MainApi';
import * as movies from '../../utils/MoviesApi';

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
  const [isNoHeader, setIsNoHeader] = useState(false);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isFooterNeeds, setIsFooterNeeds] = useState(true);
  const [moviesSet, setMoviesSet] = useState([]);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
    /*{id: '',
    nameRU: '',
    nameEN: '',
    description: '',
    director: '',
    country: '',
    duration: '',
    trailerLink: '',
    created_at: '',
    updated_at: '',
    year: '',
    image: '',
  });*/

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleTokenCheck = () => {
    setIsTokenChecked(true);
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            handleTokenCheck();
            handleLogin();
            //const url = location.state?.returnUrl || '/';
            const url = location.pathname || '/movies';
            navigate(url, { replace: true });
            //navigate('/movies', { replace: true });
          }
        })
        .catch((err) => {
          navigate('/signin', { replace: true });
          console.log(err)
        });
    }
  }

  useEffect(() => {


  }, [isTokenChecked])

  useEffect(() => {
    document.title = 'Movies explorer';
    document.documentElement.setAttribute('lang', 'ru');
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [isTokenChecked]);
  
  useEffect(() => {
    movies.getMovies()
      .then((data) => {
        const moviesArr = Array.from(data);
        if (data) {
          moviesArr.map((item, i) => {
            const {
              id,
              nameRU,
              nameEN,
              description,
              director,
              country,
              duration,
              trailerLink,
              created_at,
              updated_at,
              year,
              image,
            } = item;
          })
        }
      })
      .catch(err => console.log(err));
  }, [])

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
    setIsNoHeader(false);
  }
  const setWithoutHeader = () => {
    setIsNoHeader(true);
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
        isNoHeader={isNoHeader}
        isSavedMovies={isOnlySaved}
      />
      <Routes>
        <Route path='/signin' element={
          <Login
            loggedIn={loggedIn}
            formValue={formValue}
            setFormValue={setFormValue}
            handleLogin={handleLogin}
            setIsNoHeader={setWithoutHeader}
            isNoHeader={isNoHeader}
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
            setIsNoHeader={setWithoutHeader}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
          />}
        />
        <Route path='/not-found' element={
          <NotFound
            setIsNoHeader={setWithoutHeader}
            setFooterDoesNotNeed={setFooterDoesNotNeed}
          />}
        />
        <Route 
          path='/movies' 
          element={
            !isTokenChecked ?
            <Preloader
              notMain={setNotMainPage}
            /> :
            <ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
              onMenuClick={handleShowPopupBtnClick}
              setAllMovies={setAllMovies}
              onlySaved={isOnlySaved}
              notMain={setNotMainPage}
              setWithHeader={setWithHeader}
              setFooterNeeds={setFooterNeeds}
              setMoviesSet={setMoviesSet}
              moviesSet={moviesSet}
            />}
        />
        <Route
          path='/saved-movies'
          element={
            !isTokenChecked ? <Preloader notMain={setNotMainPage} /> :
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={loggedIn}
              onMenuClick={handleShowPopupBtnClick}
              setOnlySavedMovies={setOnlySaved}
              onlySaved={isOnlySaved}
              notMain={setNotMainPage}
              setWithHeader={setWithHeader}
              setFooterNeeds={setFooterNeeds}
              moviesSet={moviesSet}
            />}
        />
        <Route 
          path='profile'
          element={
            !isTokenChecked ? <Preloader
              notMain={setNotMainPage} /> :
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
          loggedIn ? <Navigate to='/movies' /> : <Navigate to='/signin' />
        } />
        <Route path='/loader' element={
          <Preloader />}
        />
        <Route path='/main' element={
          <Main isMain={setMainPage}
          />}
        />
        <Route path='*' element={
          <NotFound
            setIsNoHeader={setWithoutHeader}
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