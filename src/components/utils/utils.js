import { onClickOutside, closeByClickOnEsc } from "../modal";

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  //SetTimeout необходим для наложения обработчика на window после рендеринга popup,
  // Иначе popup закроется сразу после открытия.
  setTimeout(() => window.addEventListener("click", onClickOutside), 0);
  window.addEventListener('keydown', closeByClickOnEsc);
};

const closePopup = (popup) => {
  window.removeEventListener("click", onClickOutside);
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeByClickOnEsc)
}

export {openPopup, closePopup}
