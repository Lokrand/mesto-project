export default class UserInfo {
  constructor(user, api, profileTitle, profileContent, profileEditButton, getUser) {
    this._user = user;
    this.api = api;
    this._getUser = getUser;
    this.profileTitle = profileTitle;
    this.profileContent = profileContent;
    this.profileEditButton = profileEditButton;
  }

 /* getUserInfo() {
    return this._getUser
    .then ((userInfo) => {
      return  userInfo;
    })
    .catch((err) => {
      console.error(err);
    })
    }*/

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
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.profileEditButton.textContent = "Сохранить";
      });
  }
}
