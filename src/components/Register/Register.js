import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

const Register = ({ handleChange, handleSubmit, formValue, setNoHeader, setFooterDoesNotNeed }) => {
  const navigate = useNavigate();

  setNoHeader();
  setFooterDoesNotNeed();
  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <label className='register__label' for='register-name'>Имя</label>
          <input className='register__input' id='register-name' type='text' name='name' value={formValue.name} onChange={handleChange} minlength='2' required></input>
          <label className='register__err-msg' for='register-name'>Что-то пошло не так...</label>
          <label className='register__label' for='register-email'>E-mail</label>
          <input className='register__input' id='register-email' type='email' name='email' value={formValue.email} onChange={handleChange} required></input>
          <label className='register__err-msg' for='register-email'>Что-то пошло не так...</label>
          <label className='register__label' for='register-password'>Пароль</label>
          <input className='register__input register__input_failed' id='register-password' type='password' name='password' value={formValue.password} onChange={handleChange} minlength='8' required></input>
          <label className='register__err-msg register__err-msg_active' for='register-password'>Что-то пошло не так...</label>
          <SubmitButton text={'Зарегистрироваться'} className={'register__submit-btn'} />
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