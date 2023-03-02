export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameUser = document.querySelector(nameSelector);
    this._aboutUser = document.querySelector(aboutSelector);
    this._avatarUser = document.querySelector(avatarSelector);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent,
      avatar: this._avatarUser.src,
      _id: this._userId,
    };
  }
  //принимает новые данные пользователя
  setUserInfo({ name, about, avatar, _id }) {
    if (name) this._nameUser.textContent = name;
    if (about) this._aboutUser.textContent = about;
    if (avatar) this._avatarUser.src = avatar;
    if (_id) this._userId = _id;
  }
}