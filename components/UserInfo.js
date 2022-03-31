
export class UserInfo {

  constructor({userNameInfoSelector, userJobInfoSelector}) {
    this._nameElement = document.querySelector(userNameInfoSelector);
    this._jobElement = document.querySelector(userJobInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }

  setUserInfo(title, job) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = job;
  }
}
