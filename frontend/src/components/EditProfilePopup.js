import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          name="name"
          id="profile-name"
          type="text"
          className="form__input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="profile-name-error form__error-msg"></span>
        <input
          name="about"
          id="profile-profession"
          type="text"
          className="form__input"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="profile-profession-error form__error-msg"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
