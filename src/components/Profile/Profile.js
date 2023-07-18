import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import Header from '../Header/Header';

const Profile = ({ loggedIn, handleLogout }) => {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const handleProfileEditClick = () => {
    setIsProfileEditing(true);
  }

  const handleProfileSaveClick = (e) => {
    e.preventDefault();
    setIsProfileEditing(false);
  }

  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('jwt');
    handleLogout();
    navigate('/signin', {replace: true});
  }

  return (
    <>
      <Header isMain={false} isAllMovies={false} isSavedMovies={false} />
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, Виталий!</h2>
          <form className='profile__form'>
            <div className='profile__form-input'>
              <label className='profile__label' htmlFor='user-name'>Имя</label>
              <input className='profile__input' placeholder='Имя' id='user-name' type='text' minLength={1} disabled={!isProfileEditing} required></input>
            </div>
            <div className='profile__form-input'>
              <label className='profile__label' htmlFor='email'>E-mail</label>
              <input className='profile__input' placeholder='E-mail' id='email' type='email' disabled={!isProfileEditing} required></input>
            </div>
            <div className={`profile__btn-wrapper ${isProfileEditing && 'profile__btn-wrapper_visible'}`}>
              <SubmitButton text='Сохранить' onClick={handleProfileSaveClick}/>
            </div>
          </form>
          <div className={`profile__links-wrapper ${isProfileEditing && 'profile__links-wrapper_hidden'}`}>
            <button className='profile__edit' onClick={handleProfileEditClick}>Редактировать</button>
            <button className='profile__exit' onClick={signOut}>Выйти из аккаунта</button>
          </div>
        </div>
      </section>
    </>
  )
};

export default Profile;