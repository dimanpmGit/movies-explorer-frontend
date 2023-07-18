import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import * as auth from '../../utils/MainApi';

const Register = ({ formValue, setFormValue, handleLogin, startPreloader, stopPreloader }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formValue;
    startPreloader();
    auth.register(name, email, password)
      .then((data) => {
        if (data.token) {
          stopPreloader();
          setFormValue({ name: '', email: '', password: '' });
          handleLogin();
          navigate('/movies', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <label className='register__label' htmlFor='register-name'>Имя</label>
          <input className='register__input' id='register-name' type='text' name='name' value={formValue.name} onChange={handleChange} minLength='2' required></input>
          <label className='register__err-msg' htmlFor='register-name'>Что-то пошло не так...</label>
          <label className='register__label' htmlFor='register-email'>E-mail</label>
          <input className='register__input' id='register-email' type='email' name='email' value={formValue.email} onChange={handleChange} required></input>
          <label className='register__err-msg' htmlFor='register-email'>Что-то пошло не так...</label>
          <label className='register__label' htmlFor='register-password'>Пароль</label>
          <input className='register__input register__input_failed' id='register-password' type='password' name='password' value={formValue.password} onChange={handleChange} minLength='8' required></input>
          <label className='register__err-msg register__err-msg_active' htmlFor='register-password'>Что-то пошло не так...</label>
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