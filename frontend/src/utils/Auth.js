class Auth {
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

  register(userData) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  login(userData) {
    return fetch(this._baseUrl + "/signin", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponse(res, true);
    });
  }

  checkToken(token) {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res, true);
    }).catch((err) => {
      console.log(err);
    });
  }
}

const authApi = new Auth({
  baseUrl: "http://temarazinback.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;
