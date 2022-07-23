export default class Popup {

  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._selector.classList.add("popup_opened");
    this._selector.addEventListener('click', (evt) => {
      this._handleClickOutside(evt);
    })
    window.addEventListener("keydown", this._handleEscClose)
  }

  close() {
    this._selector.classList.remove("popup_opened");
    this._selector.removeEventListener('click', (evt) => {
      this._handleClickOutside(evt);
    })
    window.removeEventListener("keydown", this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.code === "Escape") {
      this._selector.classList.remove("popup_opened");
    }
  }

  _handleClickOutside(evt) {
    if (
      evt.target.classList.contains("popup")
    ) {
      this._selector.classList.remove("popup_opened");
    }
  }

  setEventListeners() {
    const buttonClose = this._selector.querySelector('.popup__close');
    buttonClose.addEventListener("click", () => {
      this._selector.classList.remove("popup_opened");
    })

}


}


