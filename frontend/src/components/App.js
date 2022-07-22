/*
Большое спасибо за развернутое ревью (что бывает далеко не всегда)! Простите, эту работу
я делал второпях, надеюсь она не слишком сильно вызвала у вас чувство отторжения ^^'.
В любом случае спасибо за комментарии и хорошего вам дня!
*/

import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/Api";
import authApi from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("1");

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [infoTooltipData, setIsInfoTooltipData] = useState({
    type: null,
    text: "",
  });

  useEffect(() => {
    if (loggedIn) {
      api
      .getPersonalData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
      .getCards()
      .then(({cards}) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          setUserEmail(data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
      history.push("/");
    }
  }, [loggedIn]);

  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .likeCard(card, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;
    if (isOwn) {
      api
        .removeCard(card._id)
        .then(() => {
          setCards((state) =>
            state.filter((curCard) => curCard._id !== card._id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .setPersonalData(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        console.log('newcard:', newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function showInfotooltip(type, text) {
    setIsInfoTooltipData({
      text: text,
      type: type,
    });
    setIsInfoTooltipOpen(true);
  }

  function handleRegister(email, password) {
    if (email && password) {
      authApi
        .register({
          email: email,
          password: password,
        })
        .then((data) => {
          let msgText = "Вы успешно зарегистрировались!";
          showInfotooltip("success", msgText);
          history.push("/sign-in");
        })
        .catch((err) => {
          let errorText = "Что-то пошло не так! Попробуйте ещё раз.";
          showInfotooltip("error", errorText);
          console.log(err);
        });
    }
  }

  function handleLogin(email, password) {
    if (email && password) {
      authApi
        .login({
          email: email,
          password: password,
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("jwt", data.token);
          }
          setLoggedIn(true);
          setUserEmail(email);
          history.push("/");
        })
        .catch((err) => {
          let errorText = "Что-то пошло не так! Попробуйте ещё раз.";
          showInfotooltip("error", errorText);
          console.log(err);
        });
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <div className="App page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          onLogout={handleLogout}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            component={Main}
            loggedIn={loggedIn}
            exact
            path="/"
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          data={infoTooltipData}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
