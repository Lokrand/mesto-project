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

export const popupDelete = new Popup("#popup_delete-card");

const api = new Api("https://nomoreparties.co/v1/plus-cohort-12/",
                    "a930b285-48bc-4fb0-af5d-2133c0eb4e79");
let section = undefined;
const openCardImage = popupWithImage.open.bind(popupWithImage);

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
          const card = new Card(item, openCardImage, "#mesto", api, popupDelete);
          return card.render();
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

const popupUserInfo = new UserInfo("#popup__profile", userData, api, profileTitle, profileContent, profileEditButton);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileEditButton.textContent = "Сохранение...";
  popupUserInfo.setUserInfo();
}

profileUpdateAvatar.addEventListener("click", () => {
  buttonUpdateAvatar.setAttribute("disabled", "disabled");
  buttonUpdateAvatar.classList.add(validatorConfig.inactiveButtonClass);
  popupUpdateAvatar.open();
});

const popupUpdateAvatar = new PopupWithForm({
  selector: "#popup_avatar-update",
  handleFormSubmit: (formData) => {
    popupUpdateAvatar.renderLoading(true, 'Сохранение...')
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
        popupUpdateAvatar.renderLoading(false, 'Сохранение...')
      });
  },
});

popupUpdateAvatar.setEventListeners();

// Validation forms

const validateProfleTitleForm = new FormValidator(
  validatorConfig,
  fieldsetCreateProfile
);
validateProfleTitleForm.enableValidation();
const validateProfileAvatarForm = new FormValidator(
  validatorConfig,
  fieldsetAvatarUpdate
);
validateProfileAvatarForm.enableValidation();
const validateCardForm = new FormValidator(validatorConfig, fieldsetNewCard);
validateCardForm.enableValidation();

// Add new cards
const popupNewCard = new PopupWithForm({
  selector: "#popup__create",
  handleFormSubmit: (formData) => {
    const placeName = formData["place-name"];
    const placeCnt = formData["place-content"];
    popupNewCard.renderLoading(true, 'Сохранение...')
    api
      .sendCardsRequest(placeName, placeCnt)
      .then((res) => {
        res.isMyCard = true;
        const card = new Card(res, openCardImage, "#mesto", api, popupDelete);
        section.addItem(card.render());
        popupNewCard.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupNewCard.renderLoading(false, 'Сохранение...')
      });
  },
});
popupNewCard.setEventListeners();

formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

openEdit.addEventListener("click", () => {
  popupUserInfo.getUserInfo();
  popupUserInfo.open();
  popupUserInfo.setEventListeners();
});

profileButton.addEventListener("click", () => {
  newPlaceButton.setAttribute("disabled", "disabled");
  newPlaceButton.classList.add(validatorConfig.inactiveButtonClass);
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
