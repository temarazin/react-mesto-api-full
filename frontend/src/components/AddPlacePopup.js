import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect( () => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      submitTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          name="name"
          id="card-name"
          type="text"
          className="form__input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="card-name-error form__error-msg"></span>
        <input
          name="link"
          id="card-url"
          type="url"
          className="form__input"
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span className="card-url-error form__error-msg"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
