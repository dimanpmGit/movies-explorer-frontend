import React from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

const Register = ({ setNoHeader }) => {
  setNoHeader();
  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form'>
          <label className='register__label' for='register-name'>Имя</label>
          <input className='register__input' id='register-name' type='text' required minlength='2'></input>
          <label className='register__err-msg' for='register-name'>Что-то пошло не так...</label>
          <label className='register__label' for='register-email'>E-mail</label>
          <input className='register__input' id='register-email' type='email' required></input>
          <label className='register__err-msg' for='register-email'>Что-то пошло не так...</label>
          <label className='register__label' for='register-password'>Пароль</label>
          <input className='register__input register__input_failed' id='register-password' type='password' required minlength='8'></input>
          <label className='register__err-msg register__err-msg_active' for='register-password'>Что-то пошло не так...</label>
          <SubmitButton text={'Зарегистрироваться'}/>
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