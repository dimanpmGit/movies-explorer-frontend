import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import * as auth from '../../utils/MainApi';

const Login = ({ loggedIn, formValue, setFormValue, handleLogin, startPreloader, stopPreloader }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    startPreloader();
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          stopPreloader();
          setFormValue({ email: '', password: '' });
          handleLogin();
          navigate('/movies', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <section className='login'>
      <div className='login__container'>
        <Logo />
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' onSubmit={handleSubmit}>
          <label className='login__label' htmlFor='login-email'>E-mail</label>
          <input className='login__input' id='login-email' type='email' name='email' value={formValue.email} onChange={handleChange} required></input>
          <label className='login__err-msg' htmlFor='login-email'>Что-то пошло не так...</label>
          <label className='login__label' htmlFor='login-password'>Пароль</label>
          <input className='login__input' id='login-password' type='password' name='password' value={formValue.password} onChange={handleChange} minLength='8' required></input>
          <label className='login__err-msg' htmlFor='login-password'>Что-то пошло не так...</label>
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