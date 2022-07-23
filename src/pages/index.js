import "./index.css";
import { openPopup, closePopup } from "../components/modal";
import { Card } from "../components/card";
import { FormValidator } from "../components/validate";
import {
  openEdit,
  profileButton,
  placeTitle,
  placeContent,
  formAddCard,
  validatorConfig,
  nameInput,
  jobInput,
  formProfileEdit,
  profileEdit,
  popupCreate,
  profileTitle,
  profileContent,
  profileAvatar,
  profileUpdateAvatar,
  buttonUpdateAvatar,
  inputUpdateAvatar,
  formUpdateAvatar,
  profileEditButton,
  newPlaceButton,
  places,
  fieldsetNewCard,
  fieldsetCreateProfile,
  fieldsetAvatarUpdate
} from "../components/utils/constants";
import { Api } from "../components/api";
import Popup from "../components/Popup";
import PopupWithImage from "../components/PopupWithImage";

const popupAvatarUpdateTest = new Popup('#popup_avatar-update');
export const popupWithImage = new PopupWithImage('#popup_view');
const api = new Api();

Promise.all([api.getProfileData(), api.getCards()])
  .then((res) => {
    const [user, cards] = res;
    window.profile = user;
    profileTitle.textContent = user.name;
    profileContent.textContent = user.about;
    profileAvatar.src = user.avatar;
    cards.map((card) => {
      card.isMyCard = (card.owner._id === user._id)
      return card;
    }).forEach((el) => {
      const card = new Card(el, '#mesto');
      places.append(card.render());
    })
  })
  .catch((err) => {
    console.error(err);
  })

// заполняем имя профиля и профессию
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileEditButton.textContent = "Сохранение...";
  api.sendProfileRequest(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileContent.textContent = jobInput.value;
      closePopup(profileEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditButton.textContent = "Сохранить";
    })
}

profileUpdateAvatar.addEventListener("click", () => {
  formUpdateAvatar.reset();
  buttonUpdateAvatar.setAttribute('disabled', 'disabled');
  buttonUpdateAvatar.classList.add(validatorConfig.inactiveButtonClass);
  popupAvatarUpdateTest.open();
  popupAvatarUpdateTest.setEventListeners();
  //openPopup(popupAvatarUpdate);
});

formUpdateAvatar.addEventListener("submit", (event) => {
  event.preventDefault();
  buttonUpdateAvatar.textContent = "Сохранение...";
  api.sendUpdateAvatar(inputUpdateAvatar.value)
    .then(() => {
      profileAvatar.src = inputUpdateAvatar.value;
      popupAvatarUpdateTest.close()
      //closePopup(popupAvatarUpdate);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonUpdateAvatar.textContent = "Сохранить";
    })
});

// Validation forms

const validateProfleTitleForm = new FormValidator(validatorConfig, fieldsetCreateProfile);
validateProfleTitleForm.enableValidation();
const validateProfileAvatarForm = new FormValidator(validatorConfig, fieldsetAvatarUpdate);
validateProfileAvatarForm.enableValidation();
const validateCardForm = new FormValidator(validatorConfig, fieldsetNewCard);
validateCardForm.enableValidation();


// Add new cards
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const placeName = placeTitle.value;
  const placeCnt = placeContent.value;
  newPlaceButton.textContent = "Сохранение...";
  api.sendCardsRequest(placeName, placeCnt)
    .then((res) => {
      res.isMyCard = true;
      const card = new Card(res, '#mesto')
      places.prepend(card.render());
      closePopup(popupCreate);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newPlaceButton.textContent = "Создать";
    });
});
formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

// открываем и закрываем модальные окна редактирования профиля и добавления карточек.
openEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileContent.textContent;
  openPopup(profileEdit);
});

profileButton.addEventListener("click", () => {
  formAddCard.reset();
  newPlaceButton.setAttribute('disabled', 'disabled');
  newPlaceButton.classList.add(validatorConfig.inactiveButtonClass);
  openPopup(popupCreate);
});
