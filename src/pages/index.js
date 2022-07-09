import "./index.css";
import { openPopup, closePopup } from "../components/utils/utils";
import { createCard, initialCards } from "../components/card";
import { setEventListeners } from "../components/validate";
import {
  openEdit,
  profileButton,
  placeTitle,
  placeContent,
  formAddCard,
  validatorConfig,
  places,
  nameInput,
  jobInput,
  formProfileEdit,
  profileEdit,
  popupCreate,
  profileTitle,
  profileContent,
} from "../components/utils/constants";

initialCards.reverse().forEach((el) => {
  renderCard(el.name, el.link);
});

function renderCard(name, link) {
  places.prepend(createCard(name, link));
}

const enableValidation = (formData) => {
  const fieldsetList = document.querySelector(formData.fieldsetNewPlace);
  const fieldsetCreateProfile = document.querySelector(
    formData.fieldsetProfile
  );
  setEventListeners(fieldsetList, formData);
  setEventListeners(fieldsetCreateProfile, formData);
};

enableValidation(validatorConfig);
// Add new cards
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const placeName = placeTitle.value;
  const placeCnt = placeContent.value;
  renderCard(placeName, placeCnt);
  closePopup(popupCreate);
});
formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

// открываем и закрываем модальные окна редактирования профиля и добавления карточек.
openEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileContent.textContent;
  openPopup(profileEdit)
  enableValidation(validatorConfig);
});

profileButton.addEventListener("click", () => {
  openPopup(popupCreate);
  formAddCard.reset();
  enableValidation(validatorConfig);
});

// заполняем имя профиля и профессию
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileContent.textContent = jobInput.value;
  closePopup(profileEdit);
}
