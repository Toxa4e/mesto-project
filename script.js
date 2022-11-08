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
const nameImput = document.querySelector('#name-profile');
const hobbiInput = document.querySelector('#hobbi');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//  Находим форму добавления карточек в DOM
const formItem = document.querySelector('.form-item');  // Поиск формы добавления карточек по классу
const nameCard = document.querySelector('#name-card');
const linkCard = document.querySelector('#link-card');
let nameCardItem;
let linkCardItem;

//открытие картинки по нажатию на неё
const popupImage = document.querySelector('.popup-image');
const pictureElement = document.querySelector('.figure__picture');
const figcaptionElement = document.querySelector('.figure__figcaption');

const elementTemplate = document.querySelector('#element').content; //получаем содержимое template

function openPopup(popups) {
  popups.classList.add('popup_opened');
};
// открыть popup профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);  
  nameImput.value = profileTitle.textContent;
  hobbiInput.value = profileSubtitle.textContent;
}); 
// открыть popup создания карточек
profileButton.addEventListener('click', function () {
  openPopup(popupItem);
});

function closePopup(popups) {
  popups.classList.remove('popup_opened');
}; 
//закрыть любой ближайший попап для кнопки закрытия
popupsClose.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popups = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popups));
});

function addCardButtons(elementElement) {
  //кнопка лайк для карточки
  elementElement.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });
  //кнопка удаления карточки и картинки
  elementElement.querySelector('.element__del-button').addEventListener('click', function () {
      const listItem = elementElement.closest('.element');
      listItem.remove();
  });
};

function addAtributeFigure(elementElement) { 
  elementElement.querySelector('.element__photo').addEventListener('click', function (e) { 
    pictureElement.src = e.target.src; 
    pictureElement.alt = e.target.alt; 
    figcaptionElement.textContent = e.target.alt; 
    openPopup(popupImage);       
  }); 
}; 

function createCard() { // тут создаем карточку и возвращаете её
  
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое elementTemplate
  // наполняем содержимым (карточки)
  elementElement.querySelector('.element__photo').src = linkCardItem;
  elementElement.querySelector('.element__photo').alt = nameCardItem;        
  elementElement.querySelector('.element__title').textContent = nameCardItem;
  // устанавливаем обработчики
  addAtributeFigure (elementElement);
  addCardButtons(elementElement);
  // возвращаем готовую карточку с установленными обработчиками
  return elementElement;
}

//----------------ШЕСТЬ КАРТОЧЕК---------------------
function addSixItem() {
for (let i = 0; i < 6; i++) {
  linkCardItem = initialCards[i].link;
  nameCardItem = initialCards[i].name;
  elements.prepend(createCard());}  
}
addSixItem();

//-----------------ДОБОВЛЕНИЕ КАРТОЧЕК ВРУЧНУЮ------------------
function handleItemFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  console.log(`Название места: ${nameCard.value}`);
  console.log(`Ссылка: ${linkCard.value}`);// Получите значение полей jobInput и nameInput из свойства value
  linkCardItem = linkCard.value;
  nameCardItem = nameCard.value;
  elements.prepend(createCard());
  closePopup(popupItem);
  evt.target.reset(); //сбрасывает поля формы
  }
// Прикрепляем обработчик к форме
formItem.addEventListener('submit', handleItemFormSubmit); 

// -------------РЕДАКТИРОВАНИЕ ПРОФИЛЯ------------------------
// При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, 
// которые отображаются на странице.
nameImput.value = profileTitle.textContent;
hobbiInput.value = profileSubtitle.textContent; 
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameImput.value;
  profileSubtitle.textContent = hobbiInput.value;
  closePopup(popupProfile);
}); 