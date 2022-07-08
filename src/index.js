import './pages/index.css';
import { handleProfileFormSubmit, onClickOutside, nameInput, jobInput, formProfileEdit,
         profileEdit, popupCreate, popupView, profileTitle, profileContent} from './components/modal';
import { openPopup, closePopup } from './components/utils';
import { renderCard } from './components/card';
import { setEventListeners } from './components/validate';

const openEdit = document.querySelector('.profile__button-edit');
const closeEdit = document.querySelector('.popup__close');
const profileButton = document.querySelector('.profile__button');
const closeCreate = document.querySelector('#close_edit');
const closeView = document.querySelector('#close_view');
const placeTitle = document.querySelector('#place-title');
const placeContent = document.querySelector('#place-content');
const formAddCard = document.querySelector('#profileNewPlace');

// Add new cards
formAddCard.addEventListener('submit', (event) => {
  event.preventDefault();
  const placeName = placeTitle.value;
  const placeCnt = placeContent.value;
  renderCard(placeName, placeCnt);
  closePopup(popupCreate);
})
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);
//

// открываем и закрываем модальные окна редактирования профиля и добавления карточек.
openEdit.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileContent.textContent
  setTimeout(() => openPopup(profileEdit) , 0)
})

// Close popup with click on esc
document.addEventListener('keydown', function (evt) {
  if (evt.code === "Escape" && (profileEdit.classList.contains('popup_opened')||popupCreate.classList.contains('popup_opened')||popupView.classList.contains('popup_opened'))) {
    closePopup(profileEdit)
    closePopup(popupCreate)
    closePopup(popupView)
    };
});

closeEdit.addEventListener('click', () => {
  closePopup(profileEdit)
})
profileButton.addEventListener('click', () => {
  setTimeout(() => openPopup(popupCreate) , 0)
  formAddCard.reset();
})
closeCreate.addEventListener('click', () => {
  closePopup(popupCreate)
})
closeView.addEventListener('click', () => {
  closePopup(popupView)
})
// closing popup by clicking on the background
window.addEventListener("click", onClickOutside);

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
formProfileEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
const enableValidation = (formData) => {
  const fieldsetList = document.querySelector(formData.fieldsetNewPlace);
  const fieldsetCreateProfile = document.querySelector(formData.fieldsetProfile);
  setEventListeners(fieldsetList, formData);
  setEventListeners(fieldsetCreateProfile, formData);
};

enableValidation({
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_error',
  fieldsetNewPlace: '#newPlace-fieldset',
  fieldsetProfile: '#create-profile-fieldset'
});
