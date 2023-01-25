import { popupProfile , popupItem , popupImage , pictureElement , figcaptionElement , formCards} from "./const.js";

export const openPopProf = function () {openPopup(popupProfile);};
export const openPopItem = function () {openPopup(popupItem);};

//открытие Попапа формы
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeListenerMouse);
  document.addEventListener('keyup', closeListenerButton);
  if (popup === popupItem) {
    formCards.reset();
  }
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
  if (evt.keyCode === 27) {
    //closeAllPop();
    //closePopup(popup);
    //console.log('Esce');
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
