import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import * as auth from '../../utils/MainApi';
import { useInput } from '../Validation/Validation';
import { Error } from '../Error/Error';

const Register = ({ handleLogin, startPreloader, stopPreloader }) => {
  const navigate = useNavigate();

  const name = useInput('', { isEmpty: true, minLength: 2 });
  const email = useInput('', { isEmpty: true, minLength: 5, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8 });
  const [errorStatus, setErrorStatus] = useState(() => false);
  const [errorText, setErrorText] = useState(() => '');

  const handleOnError = (text) => {
    setErrorText(() => text || 'Что-то пошло не так...');
    setErrorStatus(() => true);
  }

  const closeBtnClick = (e) => {
    e.preventDefault();
    setErrorStatus(() => false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    startPreloader();
    auth.register(name.value, email.value, password.value)
      .then((data) => {
        stopPreloader(data.message);
        if (data.token) {
          navigate('/movies', { replace: true });
        }
        else if (data.message) {
          handleOnError('Что-то пошло не так...');
        }
      })
      .catch((err) => {
        stopPreloader();
        handleOnError('Что-то пошло не так...');
      })
  }

  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <div className='register__input-wrapper'>
            <label className='register__label' htmlFor='register-name'>Имя</label>
            <input className={`register__input ${!name.isInputValid && 'register__input_failed'}`} id='register-name' type='text' name='name' value={name.value} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} minLength='2' required></input>
            {(name.isDirty && !name.isInputValid) && <span className='register__err-msg'>{name.errorText}</span>}
          </div>
          <div className='register__input-wrapper'>
            <label className='register__label' htmlFor='register-email'>E-mail</label>
            <input className={`register__input ${!email.isInputValid && 'register__input_failed'}`} id='register-email' type='email' name='email' value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} required></input>
            {(email.isDirty && !email.isInputValid) && <span className='register__err-msg'>{email.errorText}</span>}
          </div>
          <div className='register__input-wrapper'>
            <label className='register__label' htmlFor='register-password'>Пароль</label>
            <input className={`register__input ${!password.isInputValid && 'register__input_failed'}`} id='register-password' type='password' name='password' value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} minLength='8' required></input>
            {(password.isDirty && !password.isInputValid) && <span className='register__err-msg'>{password.errorText}</span>}
          </div>
          <SubmitButton 
            text={'Зарегистрироваться'}
            isDisabled={(!name.isInputValid || !email.isInputValid || !password.isInputValid)}
          />
          <Error errorText={'Что-то пошло не так...'} errorStatus={errorStatus} closeBtnClick={closeBtnClick} />
        </form>
        <div className='register__enter-menu'>
          <p className='register__enter-menu-text'>Уже зарегистрированы?</p>
          <a className='register__enter-menu-link app__link' href='/signin'>Войти</a>
        </div>
      </div>
    </section>
  )
};

export default Register;