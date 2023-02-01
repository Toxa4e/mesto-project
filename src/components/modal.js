import { popupProfile , popupItem , popupImage , pictureElement , figcaptionElement , formCards , nameImput , hobbiInput , profileTitle , profileSubtitle , submitCard , submitProf , popupAvatar , submitAvatar , linkAvatar , formAvatar , profileImage} from "./const.js";
import { validButton } from "./validate.js";

export const openPopAvatar = function () {
  openPopup(popupAvatar);
  formAvatar.reset();
  validButton(submitAvatar, true);
};

export const openPopProf = function () {
  nameImput.value = profileTitle.textContent;
  hobbiInput.value = profileSubtitle.textContent; 
  openPopup(popupProfile);
  validButton(submitProf, true);
};

export const openPopItem = function () {
  openPopup(popupItem);
  formCards.reset();
  validButton(submitCard, true);
};

//открытие Попапа формы
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeListenerMouse);
  document.addEventListener('keyup', closeListenerButton);
};

//открытие Попапа картинки
export function openPopElem (evt) {
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
  popup.removeEventListener('click', closeListenerMouse);
  document.removeEventListener('keyup', closeListenerButton);
};

//закрытие на крестик или оверлей
function closeListenerMouse (evt) {
  if (evt.target.closest('.popup__close')||evt.target.classList.contains('popup')) {
    //closeAllPop();
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//закрытие на кнопку Esc
function closeListenerButton (evt) {
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
