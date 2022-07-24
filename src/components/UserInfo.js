import Popup from "../components/Popup.js";
import {
  profileTitle,
  profileContent,
  profileEditButton,
} from "./utils/constants.js";
import { Api } from "./api";
const api = new Api();

export default class UserInfo extends Popup {
  constructor(selector, user) {
    super(selector);
    this._user = user;
  }

  getUserInfo() {
    api
      .getProfileData()
      .then(() => {
        this._user.name.value = profileTitle.textContent;
        this._user.about.value = profileContent.textContent;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setUserInfo() {
    api
      .sendProfileRequest(this._user.name.value, this._user.about.value)
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
      });
  }
}
