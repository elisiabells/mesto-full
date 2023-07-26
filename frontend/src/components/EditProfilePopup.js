import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Имя" className="popup__input popup__input_type_name" id="name-input" minLength="2" maxLength="40" />
      <span className="popup__input-error name-input-error"></span>
      <input type="text" name="about" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="О себе" className="popup__input popup__input_type_about" id="about-input" minLength="2" maxLength="200" />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;