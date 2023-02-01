export const popups = document.querySelectorAll('.popup');  // находим все popup
export const popupProfile = document.querySelector('.profile-popup');
export const popupItem = document.querySelector('.popup-item');
export const profileEditButton = document.querySelector('.profile__edit-button');  //кнопка открытия формы редоктирования профиля
export const profileButton = document.querySelector('.profile__button'); //кнопка открытия формы для создания карточек
export const popupsClose = document.querySelectorAll('.popup__close'); // находим все кнопки закрытия проекта
export const elements = document.querySelector('.elements');

export const popupAvatar = document.querySelector('.popup-avatar');

// Находим форму редактирования профиля в DOM
export const formElement = document.querySelector('.form');  // Поиск формы редактирования профиля по классу

export const formProfile = document.forms.formProfile;
export const nameImput = formProfile.elements.nameProfile;
export const hobbiInput = formProfile.elements.hobbi;
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileImage = document.querySelector('.profile__image');
export const profileAvatar = document.querySelector('.profile__avatar');

//  Находим форму добавления карточек в DOM
export const formItem = document.querySelector('.form-item');  // Поиск формы добавления карточек по классу
export const formCards = document.forms.formCards;
export const nameCard = formCards.elements.nameCard;
export const linkCard = formCards.elements.linkCard;
export const submitCard = document.querySelector('.form-item__button');
export const submitProf = document.querySelector('.form__button');

export const formAvatarProf = document.querySelector('.form-avatar');  // Поиск формы редоктирования аватара по классу
export const formAvatar = document.forms.formAvatar;
export const linkAvatar = formAvatar.elements.linkAvatar;
export const submitAvatar = document.querySelector('.form-avatar__button');
//открытие картинки по нажатию на неё
export const popupImage = document.querySelector('.popup-image');
export const pictureElement = document.querySelector('.figure__picture');
export const figcaptionElement = document.querySelector('.figure__figcaption');

export const elementTemplate = document.querySelector('#element').content; //получаем содержимое template

export const requestFromServer = {
    fetchUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
    headers: {
      authorization: 'c83b4442-43cd-4ffb-b808-c19eb2f5ff8a',
      'Content-Type': 'application/json',
    },
};

export const serverResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status, res.statusText);
  }
};