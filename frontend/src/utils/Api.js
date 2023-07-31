class Api {
   constructor(options) {
      this._url = options.url;
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      } else {
         return Promise.reject(`Ошибка: ${res.status}`);
      }
   }

   // Получить информацию о пользователе
   getUserInfo() {
      return fetch(`${this._url}/users/me`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         }
      })
         .then(this._checkResponse);
   }

   // Получить начальные карточки
   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         }
      })
         .then(this._checkResponse);
   }

   // Добавление новой карточки.
   addNewCard(data) {
      return fetch(`${this._url}/cards`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
         body: JSON.stringify({
            name: data.name,
            link: data.link
         }),
      })
         .then(this._checkResponse);
   }

   // Установить информацию о пользователе
   setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
         method: "PATCH",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
         body: JSON.stringify({
            name: data.name,
            about: data.about
         }),
      })
         .then(this._checkResponse);
   }

   // Установить или удалить лайк
   changeLike(cardId, like) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
         method: like ? "PUT" : "DELETE",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
      }).then(this._checkResponse);
   }

   // Удалить карточку
   deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
         method: "DELETE",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
      }).then(this._checkResponse);
   }

   // Изменить аватар пользователя
   changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: "PATCH",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
         .then(this._checkResponse);
   }
}

export const api = new Api({
   url: 'http://localhost:3000',
});