
export class UserInfo {

  constructor({userNameInfoSelector, userJobInfoSelector, userAvatarSelector}) {
    this._nameElement = document.querySelector(userNameInfoSelector);
    this._jobElement = document.querySelector(userJobInfoSelector);
    this._avatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }

  setUserInfo(title, job, avatar) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatar;
  }
}
