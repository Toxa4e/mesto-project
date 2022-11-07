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
const popup = document.querySelectorAll('.popup');  // находим все popup
const popupProfile = document.querySelector('.profile-popup');
const popupItem = document.querySelector('.popup-item');
const profileEditButton = document.querySelector('.profile__edit-button');  //кнопка открытия формы редоктирования профиля
const profileButton = document.querySelector('.profile__button'); //кнопка открытия формы для создания карточек
const popupClose = document.querySelectorAll('.popup__close'); // находим все кнопки закрытия проекта

const elements = document.querySelector('.elements');

// Находим форму редактирования профиля в DOM
const formElement = document.querySelector('.form');
const nameImput = document.getElementById('name-profile');
const hobbiInput = document.getElementById('hobbi');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//  Находим форму добавления карточек в DOM
const formItem = document.querySelector('.form-item');
const nameCard = document.getElementById('name-card');
const linkCard = document.getElementById('link-card');
let nameCardItem;
let linkCardItem;

//открытие картинки по нажатию на неё
const popupImage = document.querySelector('.popup-image');
const pictureElement = document.querySelector('.figure__picture');
const figcaptionElement = document.querySelector('.figure__figcaption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}; 
//закрыть любой ближайший попап для кнопки закрытия
popupClose.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

function addCardButtons() {
  //кнопка лайк для карточки
  const likeButton = document.querySelector('.element__button'); 
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });
  //кнопка удаления карточки и картинки
  const buttonDelet = document.querySelector('.element__del-button'); 
  buttonDelet.addEventListener('click', function () {
      const listItem = buttonDelet.closest('.element');
      listItem.remove();
  });
};

function addAtributeFigure () {
  const photoElement = document.querySelector('.element__photo').addEventListener('click', function (e) {
    pictureElement.src = e.target.src;
    pictureElement.alt = e.target.alt;
    figcaptionElement.textContent = e.target.alt;
    popupImage.classList.add('popup_opened');     
  });
};



function createCard() { // тут создаем карточку и возвращаете её
  const elementTemplate = document.querySelector('#element').content; //получаем содержимое template
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое elementTemplate
  // наполняем содержимым (карточки)
  elementElement.querySelector('.element__photo').src = linkCardItem;
  elementElement.querySelector('.element__photo').alt = nameCardItem;        
  elementElement.querySelector('.element__title').textContent = nameCardItem;
  return elementElement;
}


//----------------ШЕСТЬ КАРТОЧЕК---------------------
function addSixItem() {
for (let i = 0; i < 6; i++) {
  linkCardItem = initialCards[i].link;
  nameCardItem = initialCards[i].name;
  elements.prepend(createCard());
  addAtributeFigure ();
  addCardButtons();}  
}
addSixItem();
//----------------ШЕСТЬ КАРТОЧЕК---------------------



//-----------------ДОБОВЛЕНИЕ КАРТОЧЕК ВРУЧНУЮ------------------
function itemFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  console.log(`Название места: ${nameCard.value}`);
  console.log(`Ссылка: ${linkCard.value}`);// Получите значение полей jobInput и nameInput из свойства value
  linkCardItem = linkCard.value;
  nameCardItem = nameCard.value;
  elements.prepend(createCard());
  addAtributeFigure ();
  addCardButtons();
  popupItem.classList.remove('popup_opened');
  evt.target.reset(); //сбрасывает поля формы
  }

// Прикрепляем обработчик к форме
formItem.addEventListener('submit', itemFormSubmit); 
//-----------------ДОБОВЛЕНИЕ КАРТОЧЕК ВРУЧНУЮ------------------









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
  popupProfile.classList.remove('popup_opened');
}); 
// -------------РЕДАКТИРОВАНИЕ ПРОФИЛЯ------------------------



