import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ 
   isOpen, 
   onClose, 
   onUpdateAvatar }) {
      
   const avatarRef = useRef();

   function handleSubmit(e) {
      e.preventDefault();

      onUpdateAvatar({
         avatar: avatarRef.current.value,
      });
   }

   return (
      <PopupWithForm
         name="avatar"
         title="Обновить аватар"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
         buttonText="Сохранить">

         <input ref={avatarRef} type="url" name="avatar" required placeholder="Ссылка на картинку" className="popup__input popup__input_type_avatar" id="avatar-input" />
         <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm>
   );
}

export default EditAvatarPopup; 