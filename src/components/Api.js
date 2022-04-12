
class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;

    this._form = document.querySelector('.popup__form');
    this._buttonElement = this._form.querySelector('.popup__submit');

  }

  _renderLoading(isLoading) {
    if(isLoading) {
      this._buttonElement.innerText = 'Сохранение...'
    }

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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

  }

  editProfile(name, about) {
    this._renderLoading(true);
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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
    this._renderLoading(false);
    })

  }

  addCard(name, link) {
    this._renderLoading(true);
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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
    this._renderLoading(false);
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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    });

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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    });

  }

  updateAvatar(avatar) {
    this._renderLoading(true);
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
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
    this._renderLoading(false);
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
