import { openPopup } from "./utils";
const popupImg = document.querySelector('.popup__content')
const popupText = document.querySelector('.popup__text')
const mestoTemplate = document.querySelector('#mesto').content;
const places = document.querySelector('.places');
const popupView = document.querySelector('#popup_view')
//

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

// clone template
initialCards.reverse();
for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link)
}


// add cards from array
function createCard(name, link) {
  const userElement = mestoTemplate.cloneNode(true);
  userElement.querySelector('.place__image').src = link;
  userElement.querySelector('.place__image').alt = name;
  userElement.querySelector('.place__title').textContent = name;

  // likee
  const likeButton = userElement.querySelector('.place__button')
  likeButton.addEventListener('click', () => {
  likeButton.classList.toggle("place__button_like");
  })

  //delete
  const deleteBut = userElement.querySelector('.place__delete')
  deleteBut.addEventListener('click', () => {
    deleteBut.closest('.place').remove();
  })

  // view
  const placeImg = userElement.querySelector('.place__image')
  placeImg.addEventListener('click', () => {
  popupImg.src = link;
  popupImg.alt = name;
  popupText.textContent = name;
  setTimeout(() => openPopup(popupView) , 0)
  })
  return userElement;
}

// add cards
export function renderCard (name, link) {
  places.prepend(createCard(name, link));
}

