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
import { deleteCard, addLikeToCard, removeLikeFromCard } from "./api";

const setLikeButtonState = (data) => {
  const myCard = data.likes.filter((el) => el._id === window.profile._id)
  return myCard.length === 1;
}
export function createCard(data) {
  const name = data.name;
  const link = data.link;
  const counter = data.likes.length;
  const userElement = mestoTemplate.cloneNode(true);
  getTemplate(name, link, userElement, counter);
  addLikeButton(userElement, data, counter);
  renderViewBlock(userElement, name, link);
  if (isMyCard(data)) {
    addDeleteButton(userElement, data);
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

function addLikeButton(templateEl, data, counter) {
  const likeButton = templateEl.querySelector(".place__button");
  if(setLikeButtonState(data)) {
    likeButton.classList.add('place__button_like')
    likeButton.addEventListener('click', () => {
      likeButton.classList.remove('place__button_like')
      removeLikeFromCard(data._id)
      // getTemplate(counter-1)
    })
  } else {
    likeButton.classList.remove('place__button_like')
    likeButton.addEventListener('click', () => {
      likeButton.classList.add('place__button_like')
      addLikeToCard(data._id)
      console.log(data)
    })
  }
    // likeButton.classList.toggle("place__button_like");
    // addLikeToCard(data._id)

    // userElement.querySelector(".place__counter").textContent = data.likes.length;

    // removeLikeButton(templateEl, data)
  // });
}
  // if (likeButton.classList.contains("place__button_like")) {
  // }
  // if (likeButton.classList.contains("place__button_like")) {
  //   likeButton.addEventListener("click", () => {
  //     likeButton.classList.remove("place__button_like")
  //   })
  // }
// const putLikeToCard = (templateEl, data) => {
//   const likeButton = templateEl.querySelector(".place__button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.add("place__button_like");
//     // addLikeToCard(data._id)
// })
// }
// const deleteLikeFromCard = (templateEl, data) => {
//   const likeButton = templateEl.querySelector(".place__button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.remove("place__button_like");
//     // removeLikeFromCard(data._id)
// })
// }
// function removeLikeButton(templateEl, data) {
//   const likeButton = templateEl.querySelector(".place__button");

//     likeButton.addEventListener("click", () => {
//       likeButton.classList.remove("place__button_like")
//     })

// }





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
