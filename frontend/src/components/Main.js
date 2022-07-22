import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="profile page__section page__section_place_profile">
        <button className="profile__avatar-btn" onClick={props.onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Жак-Ив Кусто"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section
        className="gallery page__section page__section_place_gallery"
        aria-label="Галерея мест"
      >
        <ul className="photo-grid">
          {props.cards.map((item) => (
            <Card
              card={item}
              onCardClick={props.onCardClick}
              onRemoveCard={props.onCardDelete}
              onCardLike={props.onCardLike}
              key={item._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
