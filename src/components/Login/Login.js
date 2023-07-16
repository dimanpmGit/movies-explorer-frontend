import React, { useState } from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

const Login = ({ handleChange, handleSubmit, formValue, setNoHeader, setFooterDoesNotNeed }) => {
  setNoHeader();
  setFooterDoesNotNeed();
  return (
    <section className='login'>
      <div className='login__container'>
        <Logo />
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' onSubmit={handleSubmit}>
          <label className='login__label' for='login-email'>E-mail</label>
          <input className='login__input' id='login-email' type='email' name='email' value={formValue.email} onChange={handleChange} required></input>
          <label className='login__err-msg' for='login-email'>Что-то пошло не так...</label>
          <label className='login__label' for='login-password'>Пароль</label>
          <input className='login__input' id='login-password' type='password' name='password' value={formValue.password} onChange={handleChange} minlength='8' required></input>
          <label className='login__err-msg' for='login-password'>Что-то пошло не так...</label>
          <SubmitButton text={'Войти'} className={'login__submit-btn'} />
        </form>
        <div className='login__enter-menu'>
          <p className='login__enter-menu-text'>Ещё не зарегистрированы?</p>
          <a className='login__enter-menu-link app__link' href='/signup'>Регистрация</a>
        </div>
      </div>
    </section>
  )
};

export default Login;