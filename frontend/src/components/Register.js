import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password })
  };

  const handleLoginClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="signup">
      <form className="signup" onSubmit={handleSubmit}>
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
        <button className="signup__submit" type="submit"> Зарегистрироваться </button>
        <div className="signup__enter">
          <span className="signup__link">Уже зарегистрированы? </span>
          <button className="signup__link signup__link-button" type="button" onClick={handleLoginClick}> Войти </button>
        </div>
      </form>
    </div>
  );
};

export default Register;