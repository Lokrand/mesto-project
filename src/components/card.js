import { openPopup } from "./utils/utils";
import {
  popupImg,
  popupText,
  mestoTemplate,
  popupView,
} from "./utils/constants";
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCard(name, link) {
  const userElement = mestoTemplate.cloneNode(true);
  getTemplate(name, link, userElement);
  addLikeButton(userElement);
  addDeleteButton(userElement);
  renderViewBlock(userElement, name, link);
  return userElement;
}
function getTemplate (name, link, userElement) {
  userElement.querySelector(".place__image").src = link;
  userElement.querySelector(".place__image").alt = name;
  userElement.querySelector(".place__title").textContent = name;
  return userElement;
}
function addLikeButton(templateEl) {
  const likeButton = templateEl.querySelector(".place__button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("place__button_like");
  });
}
function addDeleteButton(templateEl) {
  const deleteBut = templateEl.querySelector(".place__delete");
  deleteBut.addEventListener("click", () => {
    deleteBut.closest(".place").remove();
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
