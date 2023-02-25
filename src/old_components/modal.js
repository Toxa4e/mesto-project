import { popupProfile , popupItem , popupImage , pictureElement , figcaptionElement , formCards , nameImput , hobbiInput , profileTitle , profileSubtitle , popupAvatar , formAvatar } from "./const.js";

export const openPopAvatar = function () {
  openPopup(popupAvatar);
};

export const openPopProf = function () {
  nameImput.value = profileTitle.textContent;
  hobbiInput.value = profileSubtitle.textContent; 
  openPopup(popupProfile);
};

export const openPopItem = function () {
  openPopup(popupItem);
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

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
};

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;  // получаем кнопку сабмита из `evt`
  const initialText = submitButton.textContent;  // записываем начальный текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);  // изменяем текст кнопки до вызова запроса
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
};