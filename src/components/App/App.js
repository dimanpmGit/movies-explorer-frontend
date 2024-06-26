import './App.css';
import React, { useState, useEffect } from 'react';
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
import { Popup } from '../Popup/Popup';
import * as mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setLoggedIn(() => true);
  }

  const handleLogout = () => {
    setLoggedIn(() => false);
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
            const url = location.pathname;
            navigate(url, { replace: true });
          }
        })
        .catch((err) => {
          handleLogout();
          navigate('/signin', { replace: true });
        });
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const startPreloader = () => {
    setIsLoading(() => true);
  }

  const stopPreloader = () => {
    setIsLoading(() => false);
  }
  
  useEffect(() => {
    document.title = 'Movies explorer';
    document.documentElement.setAttribute('lang', 'ru');
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {isLoading && <Popup element={Preloader} />}
        <Routes>
          <Route path='/signin' element={
            <Login
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              startPreloader={startPreloader}
              stopPreloader={stopPreloader}
            />}
          />
          <Route path='/signup' element={
            <Register
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              startPreloader={startPreloader}
              stopPreloader={stopPreloader}
            />}
          />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/movies' element={<ProtectedRoute element={Movies} loggedIn={loggedIn} startPreloader={startPreloader} stopPreloader={stopPreloader} />} />
          <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} startPreloader={startPreloader} stopPreloader={stopPreloader} />} />
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
            //loggedIn ? <Navigate to='/movies' /> : <Navigate to='/main' />
            <Navigate to='/main' loggedIn={loggedIn} />
          } />
          <Route path='/main' element={<Main loggedIn={loggedIn} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;