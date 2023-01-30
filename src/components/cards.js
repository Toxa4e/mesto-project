import { nameImput , hobbiInput ,  popupItem  , popupProfile , profileTitle , profileSubtitle , elements , elementTemplate , linkCard , nameCard , requestFromServer} from "./const.js";
//import { initialCards } from './initialCards.js';
import { closePopup } from "./modal.js";
import { sendingServerProfileInfo , sendingServerCardItem} from "./api.js";



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
export function addServerItem(data) {
  for (let i = 0; i < data.length; i++) {
    //linkCardItem = initialCards[i].link;
    //nameCardItem = initialCards[i].name;
    elements.prepend(createCard(data[i].link, data[i].name));}  
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
    sendingServerCardItem(requestFromServer, {
      link: linkCard.value,
      name: nameCard.value
    });
    closePopup(popupItem);
    //evt.target.reset(); //сбрасывает поля формы
    //formCards.reset();
};
  
export function editProfInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameImput.value;
    profileSubtitle.textContent = hobbiInput.value;
    //const { name, about } = evt.currentTarget.elements;
    sendingServerProfileInfo(requestFromServer, {
      name: nameImput.value,
      about: hobbiInput.value
    });
    closePopup(popupProfile);
};