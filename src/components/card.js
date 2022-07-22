import { closePopup, openPopup } from "./modal";
import {
  popupDeleteCard,
  deleteCardButton,
  places,
} from "./utils/constants";
import { Api } from "./api";
import {popupWithImage} from "../pages/index" /*для тестирования. Пока не очень понятно,
"как реализовать вот это:
Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом.
Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick".*/

export class Card {
  constructor(data, selector) {
    this.data = data;
    this.selector = document.querySelector(selector);
  }

  renderCard() {
    places.prepend(this._createCard());
  }

  _changeCounter = (userElement, counter) => {
    userElement.querySelector(".place__counter").textContent = counter;
    return userElement;
  }

  _createCard() {
    const name = this.data.name;
    const link = this.data.link;
    const counter = this.data.likes.length;
    const userElement = this.selector.content.cloneNode(true);
    this._getTemplate(name, link, userElement, this.data._id);
    this._changeCounter(userElement, counter)
    this._addLikeButton(userElement);
    this._renderViewBlock(userElement, name, link);
    if (this.data.isMyCard) {
      this._addDeleteButton(userElement);
    }
    return userElement;
  }

  _setLikeButtonState () {
    return this.data.likes.some((el) => el._id === window.profile._id)
  }


  _getTemplate (name, link, userElement, id) {
    userElement.querySelector(".place__image").src = link;
    userElement.querySelector(".place__image").alt = name;
    userElement.querySelector(".place__title").textContent = name;
    userElement.querySelector(".place").id = `card${id}`;
    return userElement;
  }

  _addLikeButton(templateEl) {
    const likeButton = templateEl.querySelector(".place__button");
    if (this._setLikeButtonState()) {
      likeButton.classList.add('place__button_like')
    } else {
      likeButton.classList.remove('place__button_like')
    }
    likeButton.addEventListener('click', (event) => {
      const elem = event.target;
      const card = elem.closest('.place');
      if (likeButton.classList.contains('place__button_like')) {
        ApiData.removeLikeFromCard(this.data._id)
        .then((res) => {
          likeButton.classList.remove('place__button_like')
          this._changeCounter(card, res.likes.length)
        })
        .catch((err) => {
          console.error(err);
        })
      } else {
        ApiData.addLikeToCard(this.data._id)
        .then((res) => {
          likeButton.classList.add('place__button_like')
          this._changeCounter(card, res.likes.length)
        })
        .catch((err) => {
          console.error(err);
        })
      }
    })
  }

  _addDeleteButton(templateEl) {
    const deleteBut = templateEl.querySelector(".place__delete");
    deleteBut.classList.remove('place__delete_hidden');
    deleteBut.addEventListener("click", () => {
      deleteCardButton.setAttribute('data-card-id', this.data._id)
      openPopup(popupDeleteCard)
    });
  }

  _renderViewBlock(templateEl, name, link) {
    const placeImg = templateEl.querySelector(".place__image");
    placeImg.addEventListener("click", () => {
      popupWithImage.open(name, link);
      popupWithImage.setEventListeners();
    });
  }
}

const ApiData = new Api();

deleteCardButton.addEventListener('click', () => {
  const cardId = deleteCardButton.getAttribute('data-card-id')
  ApiData.deleteCard(cardId)
  .then(() => {
    document.querySelector(`#card${cardId}`).remove();
    closePopup(popupDeleteCard);
  })
  .catch((err) => {
    console.error(err);
  })
})
