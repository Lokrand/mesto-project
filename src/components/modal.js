import { closePopup } from "./utils/utils";

export const closeByClickOnEsc = (evt) => {
  if (evt.code === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}
export const onClickOutside = (evt) => {
  console.log( evt.target)
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-cross')) {
    closePopup(document.querySelector('.popup_opened'))
  };
};
