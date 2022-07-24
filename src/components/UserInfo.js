import Popup from "../components/Popup.js";
export default class UserInfo extends Popup {
  constructor(selector, user, api, profileTitle, profileContent, profileEditButton) {
    super(selector);
    this._user = user;
    this.api = api;
    this.profileTitle = profileTitle;
    this.profileContent = profileContent;
    this.profileEditButton = profileEditButton;
  }

  getUserInfo() {
    this.api
      .getProfileData()
      .then(() => {
        this._user.name.value = this.profileTitle.textContent;
        this._user.about.value = this.profileContent.textContent;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setUserInfo() {
    this.api
      .sendProfileRequest(this._user.name.value, this._user.about.value)
      .then((userData) => {
        this.profileTitle.textContent = userData.name;
        this.profileContent.textContent = userData.about;
        super.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.profileEditButton.textContent = "Сохранить";
      });
  }
}
