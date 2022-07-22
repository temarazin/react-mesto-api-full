import React from "react";
import Popup from "./Popup";

function PopupWithForm({ isOpen, name, onClose, ...props }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h3 className="popup__header">{props.title}</h3>
      <form
        name={`form-${name}`}
        className="form popup__form"
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button type="submit" className="button form__submit">
          {props.submitTitle}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
