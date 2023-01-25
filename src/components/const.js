export const popups = document.querySelectorAll('.popup');  // находим все popup
export const popupProfile = document.querySelector('.profile-popup');
export const popupItem = document.querySelector('.popup-item');
export const profileEditButton = document.querySelector('.profile__edit-button');  //кнопка открытия формы редоктирования профиля
export const profileButton = document.querySelector('.profile__button'); //кнопка открытия формы для создания карточек
export const popupsClose = document.querySelectorAll('.popup__close'); // находим все кнопки закрытия проекта
export const elements = document.querySelector('.elements');

// Находим форму редактирования профиля в DOM
export const formElement = document.querySelector('.form');  // Поиск формы редактирования профиля по классу

export const formProfile = document.forms.formProfile;
export const nameImput = formProfile.elements.nameProfile;
export const hobbiInput = formProfile.elements.hobbi;
//const nameImput = document.querySelector('#name-profile');
//const hobbiInput = document.querySelector('#hobbi');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

//  Находим форму добавления карточек в DOM
export const formItem = document.querySelector('.form-item');  // Поиск формы добавления карточек по классу
export const formCards = document.forms.formCards;
export const nameCard = formCards.elements.nameCard;
export const linkCard = formCards.elements.linkCard;
//const nameCard = document.querySelector('#name-card');
//const linkCard = document.querySelector('#link-card');
//export let nameCardItem;
//export let linkCardItem;

//открытие картинки по нажатию на неё
export const popupImage = document.querySelector('.popup-image');
export const pictureElement = document.querySelector('.figure__picture');
export const figcaptionElement = document.querySelector('.figure__figcaption');

export const elementTemplate = document.querySelector('#element').content; //получаем содержимое template

//const closeAllPop = function () {closePopup(popupProfile);closePopup(popupItem);closePopup(popupImage);};
//const popupOpened = document.querySelector('.popup_opened');