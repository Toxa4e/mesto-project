import { popupProfile , popupItem , popupImage , pictureElement , figcaptionElement , formCards , nameImput , hobbiInput , profileTitle , profileSubtitle , popupAvatar , formAvatar } from "./const.js";

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


/*
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}*/
//Форма редактирования профиля
/*export function handleProfileFormSubmit(evt) {
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
};*/

//Форма редактирования профиля
/*export function handleProfileFormSubmit(evt) {
  function makeRequest() {
    //отпровляем на сервер и получаем ответ
    return sendingServerProfileInfo(nameImput.value, hobbiInput.value)
    //если все в порядке записываем в DOM
    .then((res) => {
      console.log(res); 
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;
      closePopup(popupProfile);
    })
  }
  handleSubmit(makeRequest, evt);
};

//Форма редактирования аватара
export function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return setAvatarProfile(linkAvatar.value)
    .then((res) => {
      profileImage.src = res.avatar;
      closePopup(popupAvatar);
    })
  }
  handleSubmit(makeRequest, evt);
};*/

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