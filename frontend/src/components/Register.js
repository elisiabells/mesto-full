import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister, onFail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Сбросить ошибки
    setPasswordError('');
    setFormError('');

    // Проверка на валидность пароля
    if (password.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
      return;
    }

    // Вызываем функцию onRegister и обрабатываем возможные ошибки
    onRegister({ email, password })
      .then(() => navigate("/sign-in"))
      .catch((err) => {
        setFormError(err.message);
        onFail();
      });
  };

  const handleLoginClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="signup">
      <form className="signup" onSubmit={handleSubmit} noValidate>
        <h2 className="signup__title">Регистрация</h2>
        <input
          className="signup__input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="signup__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <span className={`popup__input-error ${passwordError && 'popup__input-error_active'}`}> {passwordError} </span>
        <button className="signup__submit" type="submit"> Зарегистрироваться </button>
        {formError && <span>{formError}</span>}
        <div className="signup__enter">
          <span className="signup__link">Уже зарегистрированы? </span>
          <button className="signup__link signup__link-button" type="button" onClick={handleLoginClick}> Войти </button>
        </div>
      </form>
    </div>
  );
};

export default Register;