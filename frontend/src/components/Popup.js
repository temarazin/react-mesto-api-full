import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children, ...props }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  function onClickOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_name_${name} ${isOpen ? "popup_opened" : ""} ${
        props?.type ? "popup_type_" + props.type : ""
      }`}
      onMouseDown={onClickOverlay}
    >
      <div
        className={`popup__container ${
          props?.type ? "popup__container_type_" + props.type : ""
        }`}
      >
        {children}
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Popup;
