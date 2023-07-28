class Api {
   constructor(api) {
      this._url = api.url;
      this._headers = api.headers;
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      } else {
         return Promise.reject(`Ошибка: ${res.status}`);
      }
   }

   // 1. Загрузка информации о пользователе с сервера.
   getUserInfo() {
      return fetch(`${this._url}/users/me`, { headers: this._headers })
         .then(this._checkResponse);
   }

   // 2. Загрузка карточек с сервера.
   getInitialCards() {
      return fetch(`${this._url}/cards`, { headers: this._headers })
         .then(this._checkResponse);
   }

   // 3. Редактирование профиля. 
   setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            about: data.about
         }),
      })
         .then(this._checkResponse);
   }

   // 4. Добавление новой карточки.
   addNewCard(data) {
      return fetch(`${this._url}/cards`, {
         method: "POST",
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            link: data.link
         }),
      })
         .then(this._checkResponse);
   }

   // 5. Постановка лайка.
   like(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
         method: "PUT",
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   // 6. Снятие лайка.
   dislike(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
         method: "DELETE",
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   // 7. Удаление карточки.
   deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
         method: "DELETE",
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   // 8. Обновление аватара пользователя.
   changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
         .then(this._checkResponse);
   }

   // 9. Изменение статуса лайка
   changeLike(cardId, isLiked) {
      const method = isLiked ? 'PUT' : 'DELETE';
      return fetch(`${this._url}/cards/likes/${cardId}`, {
         method: method,
         headers: this._headers,
      })
         .then(this._checkResponse);
   }
}

export const api = new Api({
   url: 'https://api.mestobyelisiabells.nomoredomains.sbs',
   headers: {
      authorization: 'f221fc97-169c-4f6c-88e9-38cc56bf9efd',
      'Content-Type': 'application/json'
   }
});