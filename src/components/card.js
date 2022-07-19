import { closePopup, openPopup } from "./modal";
import {
  popupImg,
  popupText,
  mestoTemplate,
  popupView,
  popupDeleteCard,
  deleteCardButton
} from "./utils/constants";
import { deleteCard, addLikeToCard, removeLikeFromCard } from "./api";
import {popupWithImage} from "../pages/index" /*для тестирования. Пока не очень понятно,
"как реализовать вот это:
Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом.
Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick".*/

const setLikeButtonState = (data) => {
  return data.likes.some((el) => el._id === window.profile._id)
}

const changeCounter = (userElement, counter) => {
  userElement.querySelector(".place__counter").textContent = counter;//in func
  return userElement;
}

export function createCard(data) {
  const name = data.name;
  const link = data.link;
  const counter = data.likes.length;
  const userElement = mestoTemplate.cloneNode(true);
  getTemplate(name, link, userElement, data._id);
  changeCounter(userElement, counter)
  addLikeButton(userElement, data, counter);
  renderViewBlock(userElement, name, link);
  if (data.isMyCard) {
    addDeleteButton(userElement, data);
  }
  return userElement;
}

function getTemplate (name, link, userElement, id) {
  userElement.querySelector(".place__image").src = link;
  userElement.querySelector(".place__image").alt = name;
  userElement.querySelector(".place__title").textContent = name;
  userElement.querySelector(".place").id = `card${id}`;
  return userElement;
}

function addLikeButton(templateEl, data) {
  const likeButton = templateEl.querySelector(".place__button");
  if (setLikeButtonState(data)) {
    likeButton.classList.add('place__button_like')
  } else {
    likeButton.classList.remove('place__button_like')
  }
  likeButton.addEventListener('click', (event) => {
    const elem = event.target;
    const card = elem.closest('.place');
    if (likeButton.classList.contains('place__button_like')) {
      removeLikeFromCard(data._id)
      .then((res) => {
        likeButton.classList.remove('place__button_like')
        changeCounter(card, res.likes.length)
      })
      .catch((err) => {
        console.error(err);
      })
    } else {
      addLikeToCard(data._id)
      .then((res) => {
        likeButton.classList.add('place__button_like')
        changeCounter(card, res.likes.length)
      })
      .catch((err) => {
        console.error(err);
      })
    }
  })
}

function addDeleteButton(templateEl, data) {
  const deleteBut = templateEl.querySelector(".place__delete");
  deleteBut.classList.remove('place__delete_hidden');
  deleteBut.addEventListener("click", () => {
    deleteCardButton.setAttribute('data-card-id', data._id)
    openPopup(popupDeleteCard)
  });
}

deleteCardButton.addEventListener('click', () => {
  const cardId = deleteCardButton.getAttribute('data-card-id')
  deleteCard(cardId)
  .then(() => {
    document.querySelector(`#card${cardId}`).remove();
    closePopup(popupDeleteCard);
  })
  .catch((err) => {
    console.error(err);
  })
})

function renderViewBlock(templateEl, name, link) {
  const placeImg = templateEl.querySelector(".place__image");
  placeImg.addEventListener("click", () => {
    //popupImg.src = link;
    //popupImg.alt = name;
    //popupText.textContent = name;
    //openPopup(popupView);
    popupWithImage.open(name, link);
    popupWithImage.setEventListeners();
  });
}
