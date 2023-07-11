import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

const Profile = () => {
  return (
    <div className='profile'>
      <Header />
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
          <div className='profile__form-input'>
            <label className='profile__label' for='user-name'>Имя</label>
            <input className='profile__input' placeholder='Имя' value='Виталий' id='user-name'></input>
          </div>
          <div className='profile__form-input'>
            <label className='profile__label' for='email'>E-mail</label>
            <input className='profile__input' placeholder='E-mail' value='pochta@yandex.ru' id='email'></input>
          </div>
        </form>
        <div className='profile__edit app__link'>Редактировать</div>
        <div className='profile__exit app__link'>Выйти из аккаунта</div>
      </div>
    </div>
  )
};

export default Profile;