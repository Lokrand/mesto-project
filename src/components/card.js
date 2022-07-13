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
  getTemplate(name, link, userElement, counter);
  changeCounter(userElement, counter)
  addLikeButton(userElement, data, counter);
  renderViewBlock(userElement, name, link);
  if (data.isMyCard) {
    addDeleteButton(userElement, data);
  }
  return userElement;
}

function getTemplate (name, link, userElement) {
  userElement.querySelector(".place__image").src = link;
  userElement.querySelector(".place__image").alt = name;
  userElement.querySelector(".place__title").textContent = name;
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
      likeButton.classList.remove('place__button_like')
      removeLikeFromCard(data._id).then((res) => {
        changeCounter(card, res.likes.length)
      })
    } else {
      likeButton.classList.add('place__button_like')
      addLikeToCard(data._id).then((res) => {
        changeCounter(card, res.likes.length)
      })
    }
  })
}

function addDeleteButton(templateEl, data) {
  const deleteBut = templateEl.querySelector(".place__delete");
  deleteBut.classList.remove('place__delete_hidden');
  deleteBut.addEventListener("click", () => {
    openPopup(popupDeleteCard)
    deleteCardButton.addEventListener('click', () => {
      deleteCard(data._id)
      deleteBut.closest(".place").remove();
      closePopup(popupDeleteCard);
    })
  });
}

function renderViewBlock(templateEl, name, link) {
  const placeImg = templateEl.querySelector(".place__image");
  placeImg.addEventListener("click", () => {
    popupImg.src = link;
    popupImg.alt = name;
    popupText.textContent = name;
    openPopup(popupView);
  });
}
