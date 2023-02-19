export class UserInfo {
    #nameUser;
    #aboutUser;
    #avatarUser;
    #userId;
  
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
      this.#nameUser = document.querySelector(nameSelector);
      this.#aboutUser = document.querySelector(aboutSelector);
      this.#avatarUser = document.querySelector(avatarSelector);
    }  
    //возвращает объект с данными пользователя
    getUserInfo() {
      return {
        name: this.#nameUser.textContent,
        about: this.#aboutUser.textContent,
        avatar: this.#avatarUser.src,
        _id: this.#userId,
      };
    }
    //принимает новые данные пользователя
    setUserInfo(userData) {
      const { name, about, avatar, _id } = userData;
      if (name) this.#nameUser.textContent = name;
      if (about) this.#aboutUser.textContent = about;
      if (avatar) this.#avatarUser.src = avatar;
      if (_id) this.#userId = _id;
    }
  }