import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { updateUser } from '../../utils/MainApi';
import { useInput } from '../Validation/Validation';
import { Error } from '../Error/Error';

const Profile = ({ handleLogout, startPreloader, stopPreloader }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const name = useInput(currentUser.name, { isEmpty: true, minLength: 2});
  const email = useInput(currentUser.email, { isEmpty: true, minLength: 5, isEmail: true });
  const [errorStatus, setErrorStatus] = useState(() => false);
  const [errorText, setErrorText] = useState(() => 'Что-то пошло не так...');

  const handleOnError = (text) => {
    setErrorText(() => text || 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
    setErrorStatus(() => true);
  }

  const closeBtnClick = (e) => {
    e.preventDefault();
    setErrorStatus(() => false);
  }
    
  const handleProfileEditClick = () => {
    setIsProfileEditing(true);
  }

  const handleProfileSaveClick = (e) => {
    const jwt = localStorage.getItem('jwt');
    e.preventDefault();
    setIsProfileEditing(false);
    if (jwt) {
      startPreloader();
      updateUser(name.value, email.value, jwt)
        .then((data) => {
          stopPreloader();
          if (data) {
            currentUser.name = name.value;
            currentUser.email = email.value;
          }
          else {
            currentUser.name = 'Гость';
            currentUser.email = '';
            return handleOnError(data.message);
          }
        })
        .catch((err) => {
          stopPreloader();
          currentUser.name = 'Гость';
          currentUser.email = '';
          handleOnError(err);
        });
    }
  }

  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('jwt');
    handleLogout();
    localStorage.removeItem('movies');
    localStorage.removeItem('saved-movies');
    localStorage.removeItem('phrase');
    localStorage.removeItem('only-short');
    localStorage.removeItem('more-btn-clicks');
    localStorage.removeItem('more-btn-clicks-saved');
    navigate('/', {replace: true});
  }
  return (
    <>
      <Header isMain={false} isAllMovies={false} isSavedMovies={false} />
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, {currentUser.name !== 'TypeError' ? currentUser.name : 'Гость'}!</h2>
          <form className='profile__form'>
            <div className='profile__form-input'>
              {(name.isDirty && !name.isInputValid) && <span className='profile__err-msg_top'>{name.errorText}</span>}
              <label className='profile__label' htmlFor='user-name'>Имя</label>
              <input className={`profile__input ${!name.isInputValid ? 'profile__input_failed' : ''}`} placeholder='Имя' id='user-name' type='text' minLength={1} value={name.value} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} disabled={!isProfileEditing} required></input>
            </div>
            <div className='profile__form-input'>
              <label className='profile__label' htmlFor='email'>E-mail</label>
              <input className={`profile__input ${!email.isInputValid ? 'profile__input_failed' : ''}`} placeholder='E-mail' id='email' type='email' value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} disabled={!isProfileEditing} required></input>
              {(name.isDirty && !name.isInputValid) && <span className='profile__err-msg_bottom'>{email.errorText}</span>}
            </div>
            <div className={`profile__btn-wrapper ${isProfileEditing && 'profile__btn-wrapper_visible'}`}>
              <SubmitButton text='Сохранить' onClick={handleProfileSaveClick} isDisabled={((name.value === currentUser.name) && (email.value === currentUser.email)) || (!name.isInputValid || !email.isInputValid)}/>
            </div>
          </form>
          <div className={`profile__links-wrapper ${isProfileEditing && 'profile__links-wrapper_hidden'}`}>
            <button className='profile__edit' onClick={handleProfileEditClick}>Редактировать</button>
            <button className='profile__exit' onClick={signOut}>Выйти из аккаунта</button>
          </div>
        </div>
        <Error errorText={errorText} errorStatus={errorStatus} closeBtnClick={closeBtnClick} />
      </section>
    </>
  )
};

export default Profile;