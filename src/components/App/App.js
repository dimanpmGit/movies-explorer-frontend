import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutProject from '../Main/AboutProject/AboutProject';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Привет</h1>
      <Routes>
        <Route path='/' element={<AboutProject />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;