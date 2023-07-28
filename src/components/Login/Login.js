import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import * as auth from '../../utils/MainApi';
import { useInput } from '../Validation/Validation';
import { Error } from '../Error/Error';
import { ERR_MSG_SOMETHING_WRONG, ERR_MSG_WRONG_EMAIL_OR_PSSWD } from '../../utils/constants';

const Login = ({ loggedIn, handleLogin, startPreloader, stopPreloader }) => {
  const navigate = useNavigate();

  const email = useInput('', { isEmpty: true, minLength: 5, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8 });
  const [errorStatus, setErrorStatus] = useState(() => false);
  const [errorText, setErrorText] = useState(() => ERR_MSG_SOMETHING_WRONG);

  const handleOnError = (text) => {
    setErrorText(() => text || ERR_MSG_WRONG_EMAIL_OR_PSSWD);
    setErrorStatus(() => true);
  }

  const closeBtnClick = (e) => {
    e.preventDefault();
    setErrorStatus(() => false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.value || !password.value) {
      return;
    }
    startPreloader();
    auth.authorize(email.value, password.value)
      .then((data) => {
        stopPreloader();
        if (data.token) {
          handleLogin();
          navigate('/', {replace: true});
        }
        else if (data.message) {
          //Если проблема с отправкой запроса на сервер, выводим ошибку
          return handleOnError(auth.getErrorMessage(data));
        }
      })
      .catch((err) => {
        stopPreloader();
        handleOnError(err);
      });
  }
  if (loggedIn) {
    return navigate('/', { replace: true });
  }
  return (
    <section className='login'>
      <div className='login__container'>
        <Logo />
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login__input-wrapper'>
            <label className='login__label' htmlFor='login-email'>E-mail</label>
            <input className='login__input' id='login-email' type='email' name='email' value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} required></input>
            {(email.isDirty && !email.isInputValid) && <span className='login__err-msg'>{email.errorText}</span>}
          </div>
          <div className='login__input-wrapper'>
            <label className='login__label' htmlFor='login-password'>Пароль</label>
            <input className={`login__input ${!password.isInputValid && 'login__input_failed'}`} id='login-password' type='password' name='password' value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} minLength='8' required></input>
            {(password.isDirty && !password.isInputValid) && <span className='login__err-msg'>{password.errorText}</span>}
          </div>
          <SubmitButton text={'Войти'} isDisabled={(!email.isInputValid || !password.isInputValid)} />
          <Error errorText={errorText} errorStatus={errorStatus} closeBtnClick={closeBtnClick} />
        </form>
        <div className='login__enter-menu'>
          <p className='login__enter-menu-text'>Ещё не зарегистрированы?</p>
          <Link className='login__enter-menu-link app__link' to='/signup'>Регистрация</Link>
        </div>
      </div>
    </section>
  )
};

export default Login;