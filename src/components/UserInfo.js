export default class UserInfo {
  constructor(profileAvatar, profileTitle, profileContent, getUser) {
     this.profileAvatar = profileAvatar,
     this.profileTitle = profileTitle;
     this.profileContent = profileContent;
     this._getUser = getUser;
  }

  getUserInfo() {
  return this._getUser
  .then ((userData) => {
    return  userData;
  })
  .catch((err) => {
    console.error(err);
  })
  }

  setUserInfo(userData) {
    this.profileTitle.textContent = userData.name;
    this.profileContent.textContent = userData.about;
    this.profileAvatar.src = userData.avatar;
    return userData._id;
  }

}

