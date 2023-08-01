import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
   const [name, setName] = useState('');
   const [link, setLink] = useState('');
   const [nameError, setNameError] = useState('');

   function handleNameChange(e) {
      setName(e.target.value);
      // валидация имени и установка ошибок
      if (e.target.value.length < 2) {
         setNameError('Имя должно быть не менее 2 символов');
      } else {
         setNameError('');
      }
   }

   function handleLinkChange(e) {
      setLink(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
         name,
         link,
      })
      // Обнуляем значения полей формы после отправки
      setName('');
      setLink('');
   }

   return (
      <PopupWithForm
         name="add"
         title="Новое место"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
         buttonText="Создать" >

         <input
            type="text"
            name="name"
            required
            placeholder="Название"
            className={`popup__input popup__input_type_card ${nameError && 'popup__input_type_error'}`}
            id="card-input"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
         />
         <span className={`popup__input-error ${nameError && 'popup__input-error_active'}`}> {nameError} </span>
         <input
            type="url"
            name="link"
            required
            placeholder="Ссылка на картинку"
            className='popup__input popup__input_type_url'
            id="url-input"
            value={link}
            onChange={handleLinkChange}
         />
         <span className="popup__input-error"></span>
      </PopupWithForm>
   );
}

export default AddPlacePopup;