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
   getUserInfo(token) {
      return fetch(`${this._url}/users/me`, { 
         headers: { 
            ...this._headers, 
            Authorization: `Bearer ${token}` 
         } 
      })
      .then(this._checkResponse);
   }

   // Получить начальные карточки
   getInitialCards(token) {
      return fetch(`${this._url}/cards`, { 
         headers: { 
            ...this._headers, 
            Authorization: `Bearer ${token}` 
         } 
      })
      .then(this._checkResponse);
   }

   // Установить информацию о пользователе
   setUserInfo(data, token) {
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

   // Добавить новую карточку
   addNewCard(data, token) {
      return fetch(`${this._url}/cards`, {
         method: "POST",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
         },
         body: JSON.stringify({
            name: data.name,
            link: data.link
         }),
      })
      .then(this._checkResponse);
   }

   // Поставить лайк
   like(id, token) {
      return fetch(`${this._url}/cards/${id}/likes`, {
         method: "PUT",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
         },
      })
      .then(this._checkResponse);
   }

   // Снять лайк
   dislike(id, token) {
      return fetch(`${this._url}/cards/${id}/likes`, {
         method: "DELETE",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
         },
      })
      .then(this._checkResponse);
   }

   // Удалить карточку
   deleteCard(id, token) {
      return fetch(`${this._url}/cards/${id}`, {
         method: "DELETE",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
         },
      })
      .then(this._checkResponse);
   }

   // Изменить аватар пользователя
   changeAvatar(data, token) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: "PATCH",
         headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
         },
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
      .then(this._checkResponse);
   }
}

// Сначала используйте новый URL и новые заголовки
export const api = new Api({
   url: 'https://api.mestobyelisiabells.nomoredomains.sbs',
   headers: {
      'Content-Type': 'application/json'
   }
});
