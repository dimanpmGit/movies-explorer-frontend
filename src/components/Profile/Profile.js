import React from 'react';
import './Profile.css';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

const Profile = ({ notMain, getProfileEdit, saveProfile, isProfileEdit }) => {
  notMain();
  return (
    <section className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
          <div className='profile__form-input'>
            <label className='profile__label' for='user-name'>Имя</label>
            <input className='profile__input' placeholder='Имя' id='user-name' type='text' reqired minLength={1}></input>
          </div>
          <div className='profile__form-input'>
            <label className='profile__label' for='email'>E-mail</label>
            <input className='profile__input' placeholder='E-mail' id='email' type='email' required></input>
          </div>
          <dvi className={`profile__btn-wrapper ${isProfileEdit && 'profile__btn-wrapper_visible'}`}>
            <SubmitButton text='Сохранить' onClick={saveProfile}/>
          </dvi>
        </form>
        <div className={`profile__links-wrapper ${isProfileEdit && 'profile__links-wrapper_hidden'}`}>
          <button className='profile__edit' onClick={getProfileEdit}>Редактировать</button>
          <button className='profile__exit'>Выйти из аккаунта</button>
        </div>
      </div>
    </section>
  )
};

export default Profile;