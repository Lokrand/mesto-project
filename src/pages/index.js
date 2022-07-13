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
  addLikeToCard,
  removeLikeFromCard,
  deleteCard,
} from "../components/api";

export const isMyCard = (card) => {
  return card.owner._id === window.profile._id;
};
// debugger;
// getProfileData, getCards через promise.all;
getProfileData().then((data) => {
  console.log(data);
  window.profile = data;
  profileTitle.textContent = data.name;
  profileContent.textContent = data.about;
  profileAvatar.src = data.avatar;
  getCards().then((data) => {
    console.log(data);
    data.reverse().forEach((el) => {
       renderCard(el);
    });
  })
  .catch((err) => {
    console.log(err);
  });
})
.catch((err) => {
  console.log(err);
});

// заполняем имя профиля и профессию
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileContent.textContent = jobInput.value;
  sendProfileRequest(nameInput.value, jobInput.value).then((res) => {
    profileEditButton.textContent = 'Сохранение...'
    if (res.status > 399) {
      throw new Error("Failed to change profile data");
    }
    return res.json();
  })
  .then(() => {
    profileEditButton.textContent = 'Сохранить'
  })
  .catch((err) => {
    console.log(err);
  });
  closePopup(profileEdit);
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
  openPopup(popupAvatarUpdate);
  formUpdateAvatar.reset();
  enableValidation(validatorConfig);
});

buttonUpdateAvatar.addEventListener("click", () => {
  profileAvatar.src = inputUpdateAvatar.value;
  sendUpdateAvatar(inputUpdateAvatar.value).then((res) => {
    buttonUpdateAvatar.textContent = "Сохранение...";
    if (res.status > 399) {
      throw new Error("Failed to change profile avatar");
    }
    return res.json();
  })
  .then(() => {
    buttonUpdateAvatar.textContent = "Сохранить";
  })
  .catch((err) => {
    console.log(err);
  });
  closePopup(popupAvatarUpdate);
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
  sendCardsRequest(placeName, placeCnt).then((res) => {
    newPlaceButton.textContent = "Сохранение...";
    if (res.status > 399) {
      throw new Error("Failed to change cards data");
    }
    return res.json();
  })
  .then(() => {
    newPlaceButton.textContent = "Создать";
  })
  .catch((err) => {
    console.log(err);
  });
  closePopup(popupCreate);
});
formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

// открываем и закрываем модальные окна редактирования профиля и добавления карточек.
openEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileContent.textContent;
  openPopup(profileEdit);
  enableValidation(validatorConfig);
});

profileButton.addEventListener("click", () => {
  openPopup(popupCreate);
  formAddCard.reset();
  enableValidation(validatorConfig);
});
