import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { updateUser } from '../../utils/MainApi';

const Profile = ({ handleLogout, startPreloader, stopPreloader }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  
  const handleProfileEditClick = () => {
    setIsProfileEditing(true);
  }

  const handleProfileSaveClick = (e) => {
    const jwt = localStorage.getItem('jwt');
    e.preventDefault();
    setIsProfileEditing(false);
    if (jwt) {
      startPreloader();
      updateUser(name, email, jwt)
        .then((data) => {
          stopPreloader();
          currentUser.name = name;
          currentUser.email = email;
        })
        .catch(err => console.log(err));
    }
  }

  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('jwt');
    handleLogout();
    navigate('/', {replace: true});
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Header isMain={false} isAllMovies={false} isSavedMovies={false} />
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
          <form className='profile__form'>
            <div className='profile__form-input'>
              <label className='profile__label' htmlFor='user-name'>Имя</label>
              <input className='profile__input' placeholder='Имя' id='user-name' type='text' minLength={1} value={name || ''} disabled={!isProfileEditing} required onChange={handleChangeName}></input>
            </div>
            <div className='profile__form-input'>
              <label className='profile__label' htmlFor='email'>E-mail</label>
              <input className='profile__input' placeholder='E-mail' id='email' type='email' value={email || ''} required onChange={handleChangeEmail} disabled={!isProfileEditing}></input>
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