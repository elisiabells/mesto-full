import React from "react";
import successfully from "../images/successfully.png";
import mistake from "../images/mistake.png";

const InfoTooltip = ({ isOpen, onClose, isError }) => {
   const popupClass = `popup popup__tooltip ${isOpen ? "popup_opened" : ""}`;

  return (
     <div className={popupClass}>
      <div className="popup__container popup__container_tooltip">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__tooltip_img"
          src={isError ? mistake : successfully}
          alt=""
        />
        <p className="popup__tooltip_copyright">
          {" "}
          {isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;