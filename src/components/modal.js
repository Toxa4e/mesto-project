import { popupProfile , popupItem , popupImage , pictureElement , figcaptionElement , formCards , nameImput , hobbiInput , profileTitle , profileSubtitle , submitCard , submitProf , popupAvatar , submitAvatar , formAvatar , profileImage , linkAvatar} from "./const.js";
import { setAvatarProfile , sendingServerProfileInfo} from "./api.js";
//import { validButton } from "./validate.js";

export const openPopAvatar = function () {
  openPopup(popupAvatar);
  formAvatar.reset();
  //validButton(submitAvatar, true);
};

export const openPopProf = function () {
  nameImput.value = profileTitle.textContent;
  hobbiInput.value = profileSubtitle.textContent; 
  openPopup(popupProfile);
  //validButton(submitProf, true);
};

export const openPopItem = function () {
  openPopup(popupItem);
  formCards.reset();
  //validButton(submitCard, true);
};

//открытие Попапа формы
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', handlePopupClose);
  document.addEventListener('keyup', handleEscape);
};

//открытие Попапа картинки
export function openImagePopup (evt) {
  if (evt.target.closest('.element__photo')) {
    pictureElement.src = evt.target.src; 
    pictureElement.alt = evt.target.alt; 
    figcaptionElement.textContent = evt.target.alt; 
    openPopup(popupImage);
  }
};

//Закрытие Попапа формы
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', handlePopupClose);
  document.removeEventListener('keyup', handleEscape);
};

//закрытие на крестик или оверлей
function handlePopupClose (evt) {
  if (evt.target.closest('.popup__close')||evt.target.classList.contains('popup')) {
    //closeAllPop();
    //const popupOpened = document.querySelector('.popup_opened');
    //closePopup(popupOpened);
    closePopup(evt.currentTarget);
  }
};

//закрытие на кнопку Esc
function handleEscape (evt) {
    if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};


export function renderLoading(isLoading, submitButtonBefore, submitButtonAfter) {
  if (isLoading) {
    submitButtonAfter.textContent = 'Сохранение...';
  } else {
    submitButtonAfter.textContent = submitButtonBefore;
  }
};
/*
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}*/
//Форма редактирования профиля
export function editProfInfo(evt) {
  evt.preventDefault();
  //отпровляем на сервер и получаем ответ
  return sendingServerProfileInfo(nameImput.value, hobbiInput.value)
  //если все в порядке записываем в DOM
  .then((res) => {
    console.log(res); 
    profileTitle.textContent = res.name;
    profileSubtitle.textContent = res.about;
    closePopup(popupProfile);
  })
};

//Форма редактирования аватара
export function edidAvatar(evt) {
  evt.preventDefault();  
  return setAvatarProfile(linkAvatar.value)
  .then((res) => {
    profileImage.src = res.avatar;
    closePopup(popupAvatar);
  });
};