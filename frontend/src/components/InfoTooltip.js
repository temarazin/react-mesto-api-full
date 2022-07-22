import Popup from "./Popup";
import successIcon from "../images/infotooltip_success.svg";
import errorIcon from "../images/infotooltip_error.svg";

function InfoTooltip({ data, isOpen, onClose }) {
  const { text, type } = data;

  return (
    <Popup isOpen={isOpen} onClose={onClose} type="inform">
      <img
        src={type === "success" ? successIcon : errorIcon}
        alt={type === "success" ? "Успешно" : "Ошибка"}
      />
      <p className="popup__text">{text}</p>
    </Popup>
  );
}

export default InfoTooltip;
