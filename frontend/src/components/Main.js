import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser?.avatar})` }}></div>
        <button
          type="button"
          className="profile__avatar-button"
          onClick={onEditAvatar}>
        </button>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__title">{currentUser?.name}</h1>
            <button
              type="button"
              aria-label="edit"
              className="profile__edit-button"
              onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__subtitle">{currentUser?.about}</p>
        </div>
        <button type="button"
          aria-label="add"
          className="profile__add-button"
          onClick={onAddPlace}>
        </button>
      </section>
      <section className="cards">
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;