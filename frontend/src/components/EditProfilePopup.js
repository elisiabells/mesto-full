import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    // валидация имени и установка ошибок
    if (e.target.value.length < 2) {
      setNameError('Имя должно содержать минимум 2 символа');
    } else {
      setNameError('');
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    // валидация имени и установка ошибок
    if (e.target.value.length < 2) {
      setDescriptionError('Описание должно содержать минимум 2 символа');
    } else {
      setDescriptionError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // валидация имени и установка ошибок
    if (nameError === '' && descriptionError === '') {
      onUpdateUser({
        name: name,
        about: description,
      });
    }
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
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        required
        placeholder="Имя"
        className={`popup__input popup__input_type_name ${nameError && 'popup__input_type_error'}`}
        id="name-input"
        minLength="2"
        maxLength="40"
      />
      <span className={`popup__input-error ${nameError && 'popup__input-error_active'}`}> {nameError} </span>
      <input
        type="text"
        name="about"
        value={description} 
        onChange={handleDescriptionChange}
        required
        placeholder="О себе"
        className={`popup__input popup__input_type_about ${descriptionError && 'popup__input_type_error'}`}
        id="about-input"
        minLength="2"
        maxLength="200"
      />
      <span className={`popup__input-error ${descriptionError && 'popup__input-error_active'}`}> {descriptionError} </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;