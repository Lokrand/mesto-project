export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", onClickOutside);
  window.addEventListener("keydown", closeByClickOnEsc);
};

export const closePopup = (popup) => {
  window.removeEventListener("click", onClickOutside);
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closeByClickOnEsc);
};

const closeByClickOnEsc = (evt) => {
  if (evt.code === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const onClickOutside = (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-cross")
  ) {
    closePopup(document.querySelector(".popup_opened"));
  }
};
