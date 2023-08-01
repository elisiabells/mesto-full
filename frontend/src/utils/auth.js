export const BASE_URL = "http://localhost:3000";

const checkResponse = (res) => {
   if (res.ok) {
      return res.json();
   } else {
      return Promise.reject(`Ошибка: ${res.status}`);
   }
};

export const register = ({ email, password }) => {
   return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
   }).then(checkResponse);
};

export const authorize = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
   }).then(checkResponse);
};

export const getContent = () => {
   const token = localStorage.getItem('jwt');
   console.log(token)
   return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   }).then(checkResponse);
};