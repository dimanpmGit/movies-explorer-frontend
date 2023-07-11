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

function App() {
  const [isMain, setIsMain] = useState(true);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main isMain={isMain}/>} />
        <Route path='/movies' element={<Movies allMovies={true} />} />
        <Route path='/saved-movies' element={<SavedMovies allMovies={false} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;