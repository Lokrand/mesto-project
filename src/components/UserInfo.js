import Popup from "../components/Popup.js";
import {profileTitle, profileContent, profileEditButton} from "./utils/constants.js";
import { Api } from "./api"
const api = new Api();

export default class UserInfo extends Popup{
  constructor(selector, user, renderer) {
    super(selector);
    this._user = user;
    this._renderer = renderer;
  }

  getUserInfo() {
  this._renderer
  .then (() => {
    this._user.name.value = profileTitle.textContent;
    this._user.about.value = profileContent.textContent;
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    profileEditButton.textContent = "Сохранить";
  })
}

  async setUserInfo(sendUserData) {
    profileEditButton.textContent = "Сохранение...";
    // sendUserData
    await api.sendProfileRequest(sendUserData.name, sendUserData.about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileContent.textContent = userData.about;
      super.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditButton.textContent = "Сохранить";
    })
  }
}

