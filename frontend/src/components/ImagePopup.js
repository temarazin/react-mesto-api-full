import Popup from "./Popup";

function ImagePopup({ name, onClose, card }) {
  return (
    <Popup isOpen={card !== null} name={name} onClose={onClose} type="image">
      <figure className="image image_no-margin">
        <img src={card?.link} alt={card?.name} className="image__img" />
        <figcaption className="image__label">{card?.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
