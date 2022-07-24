import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
  }

  open(name, link) {
    super.open();
    const popupImg = this._selector.querySelector('div img');
    const popupText = this._selector.querySelector('div .popup__text');
    popupImg.src = link;
    popupImg.alt = name;
    popupText.textContent = name;
  }
}
