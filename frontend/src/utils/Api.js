class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res, isJsonAnswer) {
    if (res.ok) {
      if (isJsonAnswer === true) {
        return res.json();
      } else {
        return true;
      }
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getPersonalData() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  setPersonalData(userData) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  addNewCard(cardData) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  likeCard(card, isNewLike) {
    const method = isNewLike ? "PUT" : "DELETE";
    return fetch(this._baseUrl + "/cards/" + card._id + "/likes", {
      method: method,
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  updateAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar ", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  _setToken() {
    this._headers.authorization = `Bearer ${localStorage.getItem("jwt")}`
  }
}

const api = new Api({
  baseUrl: "https://temarazinback.nomoredomains.xyz",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
