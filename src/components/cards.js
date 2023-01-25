import { nameImput , hobbiInput ,  popupItem  , popupProfile , profileTitle , profileSubtitle , elements , elementTemplate , linkCard , nameCard} from "./const.js";
//import { initialCards } from './initialCards.js';
import { closePopup } from "./modal.js";

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
//let nameCardItem;
//let linkCardItem;
// тут создаем карточку и возвращаете её  
function createCard(link, name) { 
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое elementTemplate
  // наполняем содержимым (карточки)
  elementElement.querySelector('.element__photo').src = link;
  elementElement.querySelector('.element__photo').alt = name;        
  elementElement.querySelector('.element__title').textContent = name;
  return elementElement;
};

//создаем массив карточек
export function addSixItem() {
for (let i = 0; i < 6; i++) {
  //linkCardItem = initialCards[i].link;
  //nameCardItem = initialCards[i].name;
  elements.prepend(createCard(initialCards[i].link, initialCards[i].name));}  
};

//кнопка Лайк карточки
export function likeElem (evt) {
    if (evt.target.closest('.element__button')) {
      evt.target.classList.toggle('element__button_active');
    }
};
  
//кнопка Удалить карточку
export function deletElem (evt) {
    if (evt.target.closest('.element__del-button')) {
      evt.target.closest('.element').remove();
    }
};

export function handleItemFormSubmit(evt) {
    evt.preventDefault(); 
    //linkCardItem = linkCard.value;
    //nameCardItem = nameCard.value;
    elements.prepend(createCard(linkCard.value, nameCard.value));
    closePopup(popupItem);
    //evt.target.reset(); //сбрасывает поля формы
    //formCards.reset();
};
  
export function editProfInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameImput.value;
    profileSubtitle.textContent = hobbiInput.value;
    closePopup(popupProfile);
};