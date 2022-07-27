import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImg = this._popup.querySelector("div img");
    this._popupText = this._popup.querySelector("div .popup__text");
  }

  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupText.textContent = name;
  }
}
