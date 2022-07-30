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
import { Popup } from "../components/Popup";
const popupDelete = new Popup("#popup_delete-card");
const popupWithImage = new PopupWithImage("#popup_view");

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

const userInfo = new UserInfo(profileAvatar, profileTitle, profileContent, api);

Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then((res) => {
    const [user, cards] = res;
    window.profile = user._id;
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
    return userInfo.setUserInfo(user);
  })

// заполняем имя профиля и профессию
const popupWithProfile = new PopupWithForm({
  selector: "#popup__profile",
  handleFormSubmit: (formData) => {
    popupWithProfile.renderLoading(true);
    api
      .sendProfileRequest(formData["name"], formData["about"])
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupWithProfile.close();
      })
      .finally(() => {
        popupWithProfile.renderLoading(false);
      });
  },
});

profileUpdateAvatar.addEventListener("click", () => {
  validateProfileAvatarForm.resetValidation();
  popupUpdateAvatar.open();
});

const popupUpdateAvatar = new PopupWithForm({
  selector: "#popup_avatar-update",
  handleFormSubmit: (formData) => {
    popupUpdateAvatar.renderLoading(true);
    api
      .sendUpdateAvatar(formData["avatar-update-input"])
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupUpdateAvatar.close();
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
      });
  },
});

// Add new cards
const popupNewCard = new PopupWithForm({
  selector: "#popup__create",
  handleFormSubmit: (formData) => {
    const placeName = formData["place-name"];
    const placeCnt = formData["place-content"];
    popupNewCard.renderLoading(true);
    api
      .sendCardsRequest(placeName, placeCnt)
      .then((res) => {
        res.isMyCard = true;
        section.addItem(createCard(res));
        popupNewCard.close();
      })
      .finally(() => {
        popupNewCard.renderLoading(false);
      });
  },
});

openEdit.addEventListener("click", () => {
  validateProfleTitleForm.resetValidation();
  userInfo
    .getUserInfo()
    .then((userData) => {
      popupWithProfile.setInputValues(userData);
    })
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
});
