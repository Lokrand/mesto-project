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
  compareId
} from "../components/api";



const isMyCard2 = compareId().then((data) => data)

export const isMyCard = async () => {
  isMyCard2.then((el) => {
    if (el[0][22].owner._id === el[1]._id) {
      return true
    }
  })
  return false;
};
// debugger;


getProfileData().then((data) => {
  console.log(data);
  profileTitle.textContent = data.name;
  profileContent.textContent = data.about;
  profileAvatar.src = data.avatar;
});

getCards().then((data) => {
  console.log(data);
  data.reverse().forEach((el) => {

    renderCard(el.name, el.link, el.likes.length, el._id);
  });
});


// заполняем имя профиля и профессию
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileContent.textContent = jobInput.value;
  sendProfileRequest(nameInput.value, jobInput.value).then((res) => {
    if (res.status > 399) {
      throw new Error("Failed to change profile data");
    }
    return res.json();
  });
  closePopup(profileEdit);
}

function renderCard(name, link, counter, cardId) {
  places.prepend(createCard(name, link, counter, cardId));
}


const deleteMyCard = () => {};

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
  sendUpdateAvatar(profileAvatar.src).then((res) => {
    if (res.status > 399) {
      throw new Error("Failed to change profile avatar");
    }
    return res.json();
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
    if (res.status > 399) {
      throw new Error("Failed to change cards data");
    }
    return res.json();
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
