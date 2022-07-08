import { closePopup } from "./utils";
const profileEdit = document.querySelector('.popup')
const popupCreate = document.querySelector('#popup__create')
const popupView = document.querySelector('#popup_view')
const profileTitle = document.querySelector('.profile__title');
const profileContent = document.querySelector('.profile__subtitle');
const formProfileEdit = document.querySelector('#editProfile');
const nameInput = formProfileEdit.querySelector('#login-name');
const jobInput = formProfileEdit.querySelector('#login-content');

const onClickOutside = (e) => {
  if (!e.composedPath().includes(document.querySelector('.popup__container'))) {
    closePopup(profileEdit)
  }
  if (!e.composedPath().includes(document.querySelector('#popup-create-container'))) {
    closePopup(popupCreate)
  }
  if (!e.composedPath().includes(document.querySelector('.popup__view'))) {
    closePopup(popupView)
  }
};
// заполняем имя профиля и профессию
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileContent.textContent = jobInput.value;
  closePopup(profileEdit);
}

export { handleProfileFormSubmit, closePopup, onClickOutside, nameInput, jobInput, formProfileEdit,
profileEdit, popupCreate, popupView, profileTitle, profileContent}
