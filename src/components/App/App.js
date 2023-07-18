import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Main from '../Main/Main';
import * as auth from '../../utils/MainApi';
import * as movies from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [moviesSet, setMoviesSet] = useState([]);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  console.log(`++++++++++++++App loggedIn : ${loggedIn}`);
  console.log(`++++++++++++++App isTokenChecked : ${isTokenChecked}`);

  const handleLogin = () => {
    return setLoggedIn(true);
  }

  const handleLogout = () => {
    return setLoggedIn(false);
  }

  const handleTokenCheck = () => {
    return setIsTokenChecked(true);
  }

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            handleTokenCheck();
            //handleLogin();
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
  }, [])

  useEffect(() => {
    handleLogin(); 
  }, [loggedIn])

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
          moviesArr.map((item) => {
            (moviesSet.length <= moviesArr.length) &&
              setMoviesSet(moviesSet => [...moviesSet, [item]]);
          })
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className='app'>
      <Routes>
        <Route path='/signin' element={
          <Login
            loggedIn={loggedIn}
            formValue={formValue}
            setFormValue={setFormValue}
            handleLogin={handleLogin}
            handleTokenCheck={handleTokenCheck}
          />}
        />
        <Route path='/signup' element={
          <Register
            loggedIn={loggedIn}
            formValue={formValue}
            setFormValue={setFormValue}
            handleLogin={handleLogin}
            handleTokenCheck={handleTokenCheck}
          />}
        />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/movies' element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />} />
        <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />} />
        <Route 
          path='profile'
          element={
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
            />}
        />
        <Route path='/' element={
          loggedIn ? <Navigate to='/movies' /> : <Navigate to='/main' />
        } />
        <Route path='/main' element={<Main />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;