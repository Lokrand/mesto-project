import "./index.css";
import { openPopup, closePopup } from "../components/modal";
import { Card } from "../components/card";
import { FormValidator } from "../components/validate";
import { Section } from "../components/Section";
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
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";


export const popupWithImage = new PopupWithImage('#popup_view');
const api = new Api();

Promise.all([api.getProfileData(), api.getCards()])
  .then((res) => {
    const [user, cards] = res;
    window.profile = user;
    profileTitle.textContent = user.name;
    profileContent.textContent = user.about;
    profileAvatar.src = user.avatar;
    const cardsArr = cards.map((card) => {
      card.isMyCard = (card.owner._id === user._id)
      return card;
    })
    const section = new Section({items: cardsArr, renderer: (item) => {
      const card = new Card(item, '#mesto');
      section.addItem(card.render())
    }}, ".places");
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  })

// заполняем имя профиля и профессию
const userData = {name: document.querySelector('#login-name'),
about: document.querySelector('#login-content')};

const popupUserInfo = new UserInfo(
  '#popup__profile',
  userData,
  api.getProfileData()
)
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileEditButton.textContent = "Сохранение...";
  popupUserInfo.setUserInfo(
    api.sendProfileRequest(userData.name.value, userData.about.value)
    )
}

/*function handleProfileFormSubmit(evt) {
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
}*/

profileUpdateAvatar.addEventListener("click", () => {
  formUpdateAvatar.reset();
  buttonUpdateAvatar.setAttribute('disabled', 'disabled');
  buttonUpdateAvatar.classList.add(validatorConfig.inactiveButtonClass);
  popupUpdateAvatar.open();
});

const popupUpdateAvatar = new PopupWithForm({
  selector: '#popup_avatar-update',
  handleFormSubmit: (formData) => {
    buttonUpdateAvatar.textContent = "Сохранение...";
    api.sendUpdateAvatar(formData["avatar-update-input"])
    .then(() => {
      profileAvatar.src = formData["avatar-update-input"];
      popupUpdateAvatar.close('#avatarUpdateForm')
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonUpdateAvatar.textContent = "Сохранить";
    })
  }
});

popupUpdateAvatar.setEventListeners()
// Validation forms

const validateProfleTitleForm = new FormValidator(validatorConfig, fieldsetCreateProfile);
validateProfleTitleForm.enableValidation();
const validateProfileAvatarForm = new FormValidator(validatorConfig, fieldsetAvatarUpdate);
validateProfileAvatarForm.enableValidation();
const validateCardForm = new FormValidator(validatorConfig, fieldsetNewCard);
validateCardForm.enableValidation();


// Add new cards
const popupNewCard = new PopupWithForm({
  selector: '#popup__create',
  handleFormSubmit: (formData) => {
  const placeName = formData["place-name"];
  const placeCnt = formData["place-content"];
  newPlaceButton.textContent = "Сохранение...";
  console.log(placeName)
  console.log(placeCnt)
  api.sendCardsRequest(placeName, placeCnt)
  .then((res) => {
    console.log(res)
    const section = new Section({items: res, renderer: (item) => {
      const card = new Card(item, '#mesto');
      section.addItem(card.render())
    }}, ".places");
    section.renderItems();
    popupNewCard.close('#profileNewPlace');
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    newPlaceButton.textContent = "Создать";
  });
  }
})
popupNewCard.setEventListeners();

formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const placeName = placeTitle.value;
  const placeCnt = placeContent.value;
  newPlaceButton.textContent = "Сохранение...";
  api.sendCardsRequest(placeName, placeCnt)
    .then((res) => {
      res.isMyCard = true;
      console.log(res)
      const section = new Section({items: res, renderer: (item) => {
        const card = new Card(item, '#mesto');
        section.addItem(card.render())
      }}, ".places");
      section.renderItem();
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
  popupUserInfo.open();
  popupUserInfo.setEventListeners();
});

profileButton.addEventListener("click", () => {
  formAddCard.reset();
  newPlaceButton.setAttribute('disabled', 'disabled');
  newPlaceButton.classList.add(validatorConfig.inactiveButtonClass);
  popupNewCard.open();

});
