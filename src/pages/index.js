import "./index.css";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import { Section } from "../components/Section";
import {
  openEdit,
  profileButton,
  validatorConfig,
  formProfileEdit,
  profileTitle,
  profileContent,
  profileAvatar,
  profileUpdateAvatar,
  buttonUpdateAvatar,
  profileEditButton,
  newPlaceButton,
  fieldsetNewCard,
  fieldsetCreateProfile,
  fieldsetAvatarUpdate,
  deleteCardButton,
} from "../components/utils/constants";
import { Api } from "../components/Api";
import Popup from "../components/Popup";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

const popupWithImage = new PopupWithImage("#popup_view");
popupWithImage.setEventListeners();

const validateProfileAvatarForm = new FormValidator(
  validatorConfig,
  fieldsetAvatarUpdate
);
const validateProfleTitleForm = new FormValidator(
  validatorConfig,
  fieldsetCreateProfile
);
const validateCardForm = new FormValidator(validatorConfig, fieldsetNewCard);

export const popupDelete = new Popup("#popup_delete-card");

const api = new Api(
  "https://nomoreparties.co/v1/plus-cohort-12/",
  "a930b285-48bc-4fb0-af5d-2133c0eb4e79"
);
let section = undefined;
const openCardImage = popupWithImage.open.bind(popupWithImage);

function createCard(item) {
  const card = new Card(item, openCardImage, "#mesto", api, popupDelete);
  return card.render();
}

Promise.all([api.getProfileData(), api.getCards()])
  .then((res) => {
    const [user, cards] = res;
    window.profile = user;
    profileTitle.textContent = user.name;
    profileContent.textContent = user.about;
    profileAvatar.src = user.avatar;
    const cardsArr = cards.map((card) => {
      card.isMyCard = card.owner._id === user._id;
      return card;
    });
    section = new Section(
      {
        items: cardsArr,
        renderer: (item) => {
          return createCard(item);
        },
      },
      ".places"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

// заполняем имя профиля и профессию
const userData = {
  name: document.querySelector("#login-name"),
  about: document.querySelector("#login-content"),
};

const popupUserInfo = new UserInfo(
  userData,
  api,
  profileTitle,
  profileContent,
  profileEditButton,
  api.getProfileData()
);

const popupWithProfile = new PopupWithForm({
  selector: "#popup__profile",
  handleFormSubmit: () => {
    popupWithProfile.renderLoading(true, "Сохранение...");
    popupUserInfo.setUserInfo();
    popupWithProfile.close();
  },
});
popupWithProfile.setEventListeners();

profileUpdateAvatar.addEventListener("click", () => {
  validateProfileAvatarForm.enableValidation();
  popupUpdateAvatar.open();
});

const popupUpdateAvatar = new PopupWithForm({
  selector: "#popup_avatar-update",
  handleFormSubmit: (formData) => {
    popupUpdateAvatar.renderLoading(true, "Сохранение...");
    api
      .sendUpdateAvatar(formData["avatar-update-input"])
      .then(() => {
        profileAvatar.src = formData["avatar-update-input"];
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false, "Сохранение...");
      });
  },
});

popupUpdateAvatar.setEventListeners();

// Validation forms
validateProfleTitleForm.enableValidation();
validateProfileAvatarForm.enableValidation();
validateCardForm.enableValidation();

// Add new cards
const popupNewCard = new PopupWithForm({
  selector: "#popup__create",
  handleFormSubmit: (formData) => {
    const placeName = formData["place-name"];
    const placeCnt = formData["place-content"];
    popupNewCard.renderLoading(true, "Сохранение...");
    api
      .sendCardsRequest(placeName, placeCnt)
      .then((res) => {
        res.isMyCard = true;
        section.addItem(createCard(res));
        popupNewCard.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupNewCard.renderLoading(false, "Сохранение...");
      });
  },
});
popupNewCard.setEventListeners();

//formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

openEdit.addEventListener("click", () => {
  popupUserInfo.getUserInfo();
  popupWithProfile.open();
});

profileButton.addEventListener("click", () => {
  validateCardForm.enableValidation();
  popupNewCard.open();
});

deleteCardButton.addEventListener("click", () => {
  const cardId = deleteCardButton.getAttribute("data-card-id");
  api
    .deleteCard(cardId)
    .then(() => {
      document.querySelector(`#card${cardId}`).remove();
      popupDelete.close();
    })
    .catch((err) => {
      console.error(err);
    });
});
popupDelete.setEventListeners();
