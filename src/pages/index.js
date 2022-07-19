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
  profileUpdateAvatar,
  popupAvatarUpdate,
  buttonUpdateAvatar,
  inputUpdateAvatar,
  formUpdateAvatar,
  profileEditButton,
  newPlaceButton,
} from "../components/utils/constants";
import {
  getCards,
  getProfileData,
  sendCardsRequest,
  sendProfileRequest,
  sendUpdateAvatar,
} from "../components/api";
import Popup from "../components/Popup";
import PopupWithImage from "../components/PopupWithImage";

const popupAvatarUpdateTest = new Popup('#popup_avatar-update');
export const popupWithImage = new PopupWithImage('#popup_view');


Promise.all([getProfileData(), getCards()])
  .then((res) => {
    const [user, cards] = res;
    window.profile = user;
    profileTitle.textContent = user.name;
    profileContent.textContent = user.about;
    profileAvatar.src = user.avatar;
    cards.map((card) => {
      card.isMyCard = (card.owner._id === user._id)
      return card;
    }).reverse().forEach((el) => {
      renderCard(el);
    })
  })
  .catch((err) => {
    console.error(err);
  })

// заполняем имя профиля и профессию
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileEditButton.textContent = "Сохранение...";
  sendProfileRequest(nameInput.value, jobInput.value)
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

function renderCard(data) {
  places.prepend(createCard(data));
}

// Редактирование аватара пользователя
profileAvatar.addEventListener("mouseover", () => {
  profileUpdateAvatar.classList.add("profile__update-avatar_visible");
});

profileAvatar.addEventListener("mouseout", () => {
  profileUpdateAvatar.classList.remove("profile__update-avatar_visible");
});

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
  sendUpdateAvatar(inputUpdateAvatar.value)
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

const enableValidation = (formData) => {
  const fieldsetList = document.querySelector(formData.fieldsetNewPlace);
  const fieldsetCreateProfile = document.querySelector(
    formData.fieldsetProfile
  );
  const fieldsetAvatarUpdate = document.querySelector(
    formData.fieldsetUpdateAvatar
  );
  setEventListeners(fieldsetAvatarUpdate, formData);
  setEventListeners(fieldsetList, formData);
  setEventListeners(fieldsetCreateProfile, formData);
};

enableValidation(validatorConfig);

// Add new cards
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const placeName = placeTitle.value;
  const placeCnt = placeContent.value;
  newPlaceButton.textContent = "Сохранение...";
  sendCardsRequest(placeName, placeCnt)
    .then((res) => {
      res.isMyCard = true;
      renderCard(res);
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
