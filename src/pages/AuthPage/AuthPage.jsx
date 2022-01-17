import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';

import s from './AuthPage.module.scss'
import sprite from '../../images/sprite.svg'

export const AuthPage = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

    const handleRegister = e => {
        e.preventDefault();
        dispatch(authOperations.register({ email, password }));
        setEmail('');
        setPassword('');
    };
    
    const handleLogin = e => {
        e.preventDefault();
        dispatch(authOperations.loginIn({ email, password }));
        setEmail('');
        setPassword('');
    };

    return (
        <section className={s.authSection}>
            <div class="container">
                <div className={s.authSectionWrapper}>
                    <div className={s.heroTitleWrapper}>
                    {/* <svg width='183px' height='46px' className={s.heroTitle}>
                        <use  href={`${sprite}#mobile-title`}></use>
                    </svg> */}
                    {/* <picture>
                        <source srcSet={`${sprite}#desktop-title`} media="(min-width: 1280px)" />

                        <source srcSet={`${sprite}#tablet-title`} media="(min-width: 768px)" />

                        <source srcSet={`${sprite}#mobile-title`} media="(min-width: 320px)" />

                        <img src={`${sprite}#mobile-title`}>
                    </picture> */}
                    <h1 className={s.heroTitle}>Kapu$ta</h1>
                    <p className={s.heroText}>Smart Finance</p>
                </div>
                <div className={s.authBox}>
                    <p className={s.googleAuthText}>Вы можете авторизоваться с помощью Google Account:</p>
                    <button type='button' className={s.googleBtn}>
                       <svg width='18px' height='18px' className={s.googleIcon}>
                            <use  href={`${sprite}#google-logo`}></use>
                        </svg>  
                        <p className={s.googleText} >Google</p>
                    </button>
                    <p className={s.authText}>Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:</p>
                    <form onSubmit={handleRegister} autoComplete='off' className={s.authForm}>
                        <label htmlFor="user-email" className={s.authLabel}>
                            Электронная почта:
                        </label>
                            <input
                                id="user-email"
                                type="text"
                                className={s.authInput}
                                placeholder='your@email.com'
                                name="email"
                                value={email}
                                onChange={handleChange}/>
                        <label htmlFor="user-password" className={s.authLabel}>
                            Пароль:
                        </label>
                            <input
                                id="user-password"
                                type="password"
                                className={s.authInput}
                                placeholder='Пароль'
                                name="password"
                                value={password}
                                onChange={handleChange}/>
                        <div className={s.btnWrapper}>
                            <button onClick={handleLogin} type='button' className={s.btn}>Войти</button>
                            <button type='submit' className={s.btn}>Регистрация</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}