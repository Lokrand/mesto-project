import { openPopup } from "./modal";
import {
  popupImg,
  popupText,
  mestoTemplate,
  popupView,
} from "./utils/constants";

export function createCard(name, link, counter) {
  const userElement = mestoTemplate.cloneNode(true);
  getTemplate(name, link, userElement, counter);
  addLikeButton(userElement);
  addDeleteButton(userElement);
  renderViewBlock(userElement, name, link);
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
