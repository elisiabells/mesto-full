import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrorMessage("");
      onLogin(email, password)
         .then(() => {
            navigate('/');
         })
         .catch((err) => {
            setErrorMessage("Ошибка. Пожалуйста, попробуйте снова.");
            console.log(err);
         });
   };

   return (
      <div>
         <form className="signin" onSubmit={handleSubmit}>
            <h2 className="signin__title">Вход</h2>
            <input
               className="signin__input"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Email" />
            <input
               className="signin__input"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password" />
            <p className="sigin__error"> {errorMessage} </p>
            <button className="signin__submit" type="submit"> Войти </button>
         </form>
      </div>
   );
};

export default Login;