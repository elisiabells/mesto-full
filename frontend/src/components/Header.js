import React from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ userEmail, isMainPage, isLoginPage, isRegisterPage }) {
   const navigate = useNavigate();
   
   const signOut = () => {
      localStorage.removeItem('jwt');
      navigate('/sign-in');
   };

   return (
      <header className="header">
         <img className="header__logo" src={headerLogo} alt="логотип" />
         <div className="header__user-info">
            {isMainPage && (
               <>
                  <span className="header__email">{userEmail}</span>
                  <button type="button" className="header__button header__exit" onClick={signOut}>Выйти</button>
               </>
            )}

            {isLoginPage && (
               <button type="button" className="header__button header__register" onClick={() => navigate('/sign-up')}>Регистрация</button>
            )}
            {isRegisterPage && (
               <button type="button" className="header__button header__login" onClick={() => navigate('/sign-in')}>Войти</button>
            )}
         </div>
      </header>
   );
}

export default Header;