import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const item = props.card;
  const isOwn = item.owner === currentUser._id;
  const isLiked = item.likes.some((i) => i === currentUser._id);

  function clickCard(e) {
    props.onCardClick(item);
  }

  function clickLike(e) {
    props.onCardLike(item);
  }

  function clickDeleteCard(e) {
    e.stopPropagation();
    props.onRemoveCard(item);
  }

  return (
    <li className="photo-grid__item">
      <div
        className="photo__image-link"
        aria-label="Увеличить изображение"
        tabIndex="0"
        onClick={clickCard}
      >
        <img src={item.link} alt={item.name} className="photo-grid__image" />
        {isOwn && (
          <button
            type="button"
            className="photo-grid__remove-button"
            aria-label="Удалить изображение"
            onClick={clickDeleteCard}
          ></button>
        )}
      </div>
      <div className="photo-grid__item-footer">
        <p className="photo-grid__item-name">{item.name}</p>
        <div className="photo-grid__like-wrapper">
          <button
            type="button"
            className={
              isLiked
                ? "photo-grid__like-button photo-grid__like-button_active"
                : "photo-grid__like-button"
            }
            aria-label="Поставить лайк"
            onClick={clickLike}
          ></button>
          <span className="photo-grid__like-count">{item.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
