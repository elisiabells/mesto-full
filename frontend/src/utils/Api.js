class Api {
   constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
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
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me`, {
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
         }
      })
         .then(this._checkResponse);
   }

   // Получить начальные карточки
   getInitialCards() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/cards`, {
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
         }
      })
         .then(this._checkResponse);
   }

   // Установить информацию о пользователе
   setUserInfo(data) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me`, {
         method: "PATCH",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
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
      const jwt = localStorage.getItem('jwt');
      return fetch(`${this._url}/cards/${cardId}/likes`, {
         method: like ? "PUT" : "DELETE",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${jwt}`,
         },
      }).then(this._checkResponse);
   }

   // Удалить карточку
   deleteCard(cardId) {
      const jwt = localStorage.getItem('jwt');
      return fetch(`${this._url}/cards/${cardId}`, {
         method: "DELETE",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${jwt}`,
         },
      }).then(this._checkResponse);
   }

   // Изменить аватар пользователя
   changeAvatar(data) {
      const jwt = localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me/avatar`, {
         method: "PATCH",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${jwt}`
         },
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
         .then(this._checkResponse);
   }
}

export const api = new Api({
   url: 'https://api.mestobyelisiabells.nomoredomains.sbs',
   headers: {
      'Content-Type': 'application/json'
   }
});
