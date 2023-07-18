import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Main from '../Main/Main';
import Preloader from '../Preloader/Preloader';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [moviesSet, setMoviesSet] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      startPreloader();
      mainApi.getContent(jwt)
        .then((data) => {
          if (data) {
            setCurrentUser({
              ...data,
              _id: data._id,
              name: data.name,
              email: data.email
            });
            stopPreloader();
            handleLogin();
            const url = location.pathname || '/movies';
            navigate(url, { replace: true });
          }
        })
        .catch((err) => {
          navigate('/signin', { replace: true });
          console.log(err)
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const startPreloader = () => {
    setIsLoading(true);
  }

  const stopPreloader = () => {
    setIsLoading(false);
  }
  
  useEffect(() => {
    document.title = 'Movies explorer';
    document.documentElement.setAttribute('lang', 'ru');
  }, []);
  
  useEffect(() => {
    startPreloader();
    moviesApi.getMovies()
      .then((data) => {
        const moviesArr = Array.from(data);
        if (data) {
          stopPreloader();
          moviesArr.map((item) => {
            (moviesSet.length <= moviesArr.length) &&
              setMoviesSet(moviesSet => [...moviesSet, [item]]);
          })
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='app'>
      {isLoading ? < Preloader /> : (
        <Routes>
          <Route path='/signin' element={
            <Login
              loggedIn={loggedIn}
              formValue={formValue}
              setFormValue={setFormValue}
              handleLogin={handleLogin}
              startPreloader={startPreloader}
              stopPreloader={stopPreloader}
            />}
          />
          <Route path='/signup' element={
            <Register
              loggedIn={loggedIn}
              formValue={formValue}
              setFormValue={setFormValue}
              handleLogin={handleLogin}
              startPreloader={startPreloader}
              stopPreloader={stopPreloader}
            />}
          />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/movies' element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />} />
          <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />} />
          <Route 
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                handleLogout={handleLogout}
                startPreloader={startPreloader}
                stopPreloader={stopPreloader}
              />}
          />
          <Route path='/' element={
            loggedIn ? <Navigate to='/movies' /> : <Navigate to='/main' />
          } />
          <Route path='/main' element={<Main />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      )}
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App;