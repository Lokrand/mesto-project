export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._setEventListeners();
  }

  open() {
    this._popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.close();
    }
  };

  _handleClickOutside = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  };

  _setEventListeners() {
    const buttonClose = this._popup.querySelector(".popup__close");
    buttonClose.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("click", this._handleClickOutside);
  }
}
