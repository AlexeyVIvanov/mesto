
class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;

  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  editProfile(name, about) {

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  addCard(name, link) {

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  deleteConfirmCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  deleteLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  addLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  updateAvatar(avatar) {

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '00472339-fc10-404b-a788-db05cfe23895',
    'Content-Type': 'application/json'
  }
});
