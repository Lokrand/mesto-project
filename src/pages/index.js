import "./index.css";
import { openPopup, closePopup } from "../components/modal";
import { createCard } from "../components/card";
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
  profileAvatar,
} from "../components/utils/constants";

import { getCards, getProfileData, sendCardsRequest, sendProfileRequest } from "../components/api"

getProfileData().then((data) => {
  profileTitle.textContent = data.name;
  profileContent.textContent = data.about;
  profileAvatar.src = data.avatar;
})

getCards().then((data) => {
  data.reverse().forEach((el) => {
    renderCard(el.name, el.link, el.likes.length)
  })
})

// заполняем имя профиля и профессию
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileContent.textContent = jobInput.value;
  sendProfileRequest(nameInput.value, jobInput.value).then((res) => {
    if(res.status > 399) {
      throw new Error('Failed to change profile data');
    }
    return res.json();
  })
  closePopup(profileEdit);
}

function renderCard(name, link, counter) {
  places.prepend(createCard(name, link, counter));
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
  sendCardsRequest(placeName, placeCnt).then((res) => {
    if(res.status > 399) {
      throw new Error('Failed to change cards data')
    }
    return res.json();
  })
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


