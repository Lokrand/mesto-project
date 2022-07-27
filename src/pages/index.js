import "./index.css";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import { Section } from "../components/Section";
import {
  openEdit,
  profileButton,
  validatorConfig,
  profileTitle,
  profileContent,
  profileAvatar,
  profileUpdateAvatar,
  fieldsetNewCard,
  fieldsetCreateProfile,
  fieldsetAvatarUpdate,
  deleteCardButton,
} from "../components/utils/constants";
import { Api } from "../components/Api";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import { popupDelete } from "../components/Popup";
let userId;

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

const userInfo = new UserInfo(
  profileAvatar,
  profileTitle,
  profileContent,
  api.getProfileData()
);

userInfo
  .getUserInfo()
  .then((user) => {
    return userInfo.setUserInfo(user);
  })
  .then((userDataId) => {
    return (userId = userDataId);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getCards()
  .then((cards) => {
    window.profile = userId;
    const cardsArr = cards.map((card) => {
      card.isMyCard = card.owner._id === userId;
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

const popupWithProfile = new PopupWithForm({
  selector: "#popup__profile",
  handleFormSubmit: (formData) => {
    popupWithProfile.renderLoading(true, "Сохранение...");
    api
      .sendProfileRequest(formData["name"], formData["about"])
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupWithProfile.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupWithProfile.renderLoading(false, "Сохранение...");
      });
  },
});

popupWithProfile.setEventListeners();

profileUpdateAvatar.addEventListener("click", () => {
  validateProfileAvatarForm.resetValidation();
  popupUpdateAvatar.open();
});

const popupUpdateAvatar = new PopupWithForm({
  selector: "#popup_avatar-update",
  handleFormSubmit: (formData) => {
    popupUpdateAvatar.renderLoading(true, "Сохранение...");
    api
      .sendUpdateAvatar(formData["avatar-update-input"])
      .then((userData) => {
        userInfo.setUserInfo(userData);
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

openEdit.addEventListener("click", () => {
  validateProfleTitleForm.resetValidation();
  api.getProfileData()
     .then((userData) => {
        popupWithProfile.setInputValues(userData);
     })
     .catch((err) => {
      console.error(err);
    });
  popupWithProfile.open();
});

profileButton.addEventListener("click", () => {
  validateCardForm.resetValidation();
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
