const initialCards = [
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];
const popups = document.querySelectorAll('.popup');  // находим все popup
const popupProfile = document.querySelector('.profile-popup');
const popupItem = document.querySelector('.popup-item');
const profileEditButton = document.querySelector('.profile__edit-button');  //кнопка открытия формы редоктирования профиля
const profileButton = document.querySelector('.profile__button'); //кнопка открытия формы для создания карточек
const popupsClose = document.querySelectorAll('.popup__close'); // находим все кнопки закрытия проекта
const elements = document.querySelector('.elements');

// Находим форму редактирования профиля в DOM
const formElement = document.querySelector('.form');  // Поиск формы редактирования профиля по классу

const formProfile = document.forms.formProfile;
const nameImput = formProfile.elements.nameProfile;
const hobbiInput = formProfile.elements.hobbi;
//const nameImput = document.querySelector('#name-profile');
//const hobbiInput = document.querySelector('#hobbi');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//  Находим форму добавления карточек в DOM
const formItem = document.querySelector('.form-item');  // Поиск формы добавления карточек по классу
const formCards = document.forms.formCards;
const nameCard = formCards.elements.nameCard;
const linkCard = formCards.elements.linkCard;
//const nameCard = document.querySelector('#name-card');
//const linkCard = document.querySelector('#link-card');
let nameCardItem;
let linkCardItem;

//открытие картинки по нажатию на неё
const popupImage = document.querySelector('.popup-image');
const pictureElement = document.querySelector('.figure__picture');
const figcaptionElement = document.querySelector('.figure__figcaption');

const elementTemplate = document.querySelector('#element').content; //получаем содержимое template

const openPopProf = function () {openPopup(popupProfile);};
const openPopItem = function () {openPopup(popupItem);};
const closeAllPop = function () {closePopup(popupProfile);closePopup(popupItem);closePopup(popupImage);};

function closeListenerMouse (evt) {
  if (evt.target.closest('.popup__close')||evt.target.classList.contains('popup')) {
    closeAllPop();
  }
};
function closeListenerButton (evt) {
  if (evt.keyCode === 27) {
    closeAllPop();
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeListenerMouse);
  this.addEventListener('keyup', closeListenerButton);
  if (popup === popupItem) {
    formCards.reset();
  }
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeListenerMouse);
  this.removeEventListener('keyup', closeListenerButton);
};

function createCard() { // тут создаем карточку и возвращаете её  
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое elementTemplate
  // наполняем содержимым (карточки)
  elementElement.querySelector('.element__photo').src = linkCardItem;
  elementElement.querySelector('.element__photo').alt = nameCardItem;        
  elementElement.querySelector('.element__title').textContent = nameCardItem;
  return elementElement;
}

function addSixItem() {
for (let i = 0; i < 6; i++) {
  linkCardItem = initialCards[i].link;
  nameCardItem = initialCards[i].name;
  elements.prepend(createCard());}  
}

function openPopElem (evt) {
  if (evt.target.closest('.element__photo')) {
    pictureElement.src = evt.target.src; 
    pictureElement.alt = evt.target.alt; 
    figcaptionElement.textContent = evt.target.alt; 
    openPopup(popupImage);
  }
};

function likeElem (evt) {
  if (evt.target.closest('.element__button')) {
    evt.target.classList.toggle('element__button_active');
  }
};

function deletElem (evt) {
  if (evt.target.closest('.element__del-button')) {
    evt.target.closest('.element').remove();
  }
};

function handleItemFormSubmit(evt) {
  evt.preventDefault(); 
  linkCardItem = linkCard.value;
  nameCardItem = nameCard.value;
  elements.prepend(createCard());
  closePopup(popupItem);
  //evt.target.reset(); //сбрасывает поля формы
  //formCards.reset();
};

function editProfInfo(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameImput.value;
  profileSubtitle.textContent = hobbiInput.value;
  closePopup(popupProfile);
}

addSixItem();
profileEditButton.addEventListener('click', openPopProf);
profileButton.addEventListener('click', openPopItem);
elements.addEventListener('click', openPopElem);
elements.addEventListener('click', likeElem);
elements.addEventListener('click', deletElem);

formItem.addEventListener('submit', handleItemFormSubmit); 

nameImput.value = profileTitle.textContent;
hobbiInput.value = profileSubtitle.textContent; 
formElement.addEventListener('submit', editProfInfo); 



//--------Валидация формы---------
const formInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

// Передадим текст ошибки вторым параметром
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
      // данные атрибута доступны у элемента инпута через ключевое слово dataset.
      // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
      // HTML мы писали в kebab-case, это не опечатка)
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}
if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
}
}; 

// Вызовем функцию isValid на каждый ввод символа
//formInput.addEventListener('input', isValid);
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputFormProfile =  Array.from(formElement.querySelectorAll('.form__input'));
  const inputFormItem = Array.from(formElement.querySelectorAll('.form-item__input'));
  const inputList = inputFormProfile.concat(inputFormItem);

  const buttonElement = formElement.querySelector('.form__submit');
  //const inputList =  Array.from(formElement.querySelectorAll('.form__input'));
  //console.log(inputList);
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const arrayFormProfile = Array.from(document.querySelectorAll('.form'));
  const arrayFormItem = Array.from(document.querySelectorAll('.form-item'));
  const formList = arrayFormProfile.concat(arrayFormItem);

  //const formList = Array.from(document.querySelectorAll('.form'));
  console.log(formList);

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
}; 



// Вызовем функцию
enableValidation();
/*enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  */