import { closePopup, openPopup } from "./modal";
import {
  popupImg,
  popupText,
  mestoTemplate,
  popupView,
  popupDeleteCard,
  deleteCardButton
} from "./utils/constants";
import { isMyCard } from "../pages/index";

export function createCard(name, link, counter, cardId) {
  const userElement = mestoTemplate.cloneNode(true);
  getTemplate(name, link, userElement, counter);
  addLikeButton(userElement);
  renderViewBlock(userElement, name, link);
  if (isMyCard()) {
    addDeleteButton(userElement);

  }
  return userElement;
}
function getTemplate (name, link, userElement, counter) {
  userElement.querySelector(".place__image").src = link;
  userElement.querySelector(".place__image").alt = name;
  userElement.querySelector(".place__title").textContent = name;
  userElement.querySelector(".place__counter").textContent = counter;
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
  deleteBut.classList.remove('place__delete_hidden');
  deleteBut.addEventListener("click", () => {
    openPopup(popupDeleteCard)
    deleteCardButton.addEventListener('click', () => {
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
