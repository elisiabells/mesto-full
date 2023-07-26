import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ 
   isOpen, 
   onClose, 
   onAddPlace }) {
      
   const [name, setName] = useState('');
   const [link, setLink] = useState('');

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleLinkChange(e) {
      setLink(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
         name,
         link,
      });
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
            className="popup__input popup__input_type_card"
            id="card-input"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
         />
         <span className="popup__input-error card-input-error"></span>
         <input
            type="url"
            name="link"
            required
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_url"
            id="url-input"
            value={link}
            onChange={handleLinkChange}
         />
         <span className="popup__input-error url-input-error"></span>
      </PopupWithForm>
   );
}

export default AddPlacePopup;