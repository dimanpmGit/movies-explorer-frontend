import React from 'react';
import './Profile.css';

const Profile = ({ notMain, getEdit }) => {
  notMain();
  return (
    <section className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
          <div className='profile__form-input'>
            <label className='profile__label' for='user-name'>Имя</label>
            <input className='profile__input' placeholder='Имя' value='Виталий' id='user-name' readonly></input>
          </div>
          <div className='profile__form-input'>
            <label className='profile__label' for='email'>E-mail</label>
            <input className='profile__input' placeholder='E-mail' value='pochta@yandex.ru' id='email' readonly></input>
          </div>
        </form>
        <button className='profile__edit' onClick={getEdit}>Редактировать</button>
        <button className='profile__exit'>Выйти из аккаунта</button>
      </div>
    </section>
  )
};

export default Profile;