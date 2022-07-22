import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const inputAvatarUrlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputAvatarUrlRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          ref={inputAvatarUrlRef}
          name="avatar"
          id="avatar"
          type="url"
          className="form__input"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
        />
        <span className="avatar-error form__error-msg"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
