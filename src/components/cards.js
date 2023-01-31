import { nameImput , hobbiInput ,  popupItem  , popupProfile , profileTitle , profileSubtitle , elements , elementTemplate , linkCard , nameCard , requestFromServer} from "./const.js";
//import { initialCards } from './initialCards.js';
import { closePopup } from "./modal.js";
import { sendingServerProfileInfo , sendingServerCardItem , deletServerCardItem , likeServerCardItem} from "./api.js";



// тут создаем карточку и возвращаете её  
function createCard(link, name) { 
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое elementTemplate
  // наполняем содержимым (карточки)
  elementElement.querySelector('.element__photo').src = link;
  elementElement.querySelector('.element__photo').alt = name;        
  elementElement.querySelector('.element__title').textContent = name;
  
  return elementElement;
};
//--------------------------------------------------------------

//создаем массив карточек
export function addServerItem(data) {
  for (let i = 0; i < data.length; i++) {
    elements.prepend(createCard(data[i].link, data[i].name));
    deletButtonElementDelet(data[i].owner.name, data[i]._id);
  }  
};

function deletButtonElementDelet(data, id) {  //убирает кнопку удаления для карточек от других пользователей
  const deletButtonItem = document.querySelector('.element__del-button');
  if (data !== profileTitle.textContent){
    //console.log(data[i].owner.name);
          //console.log(deletButtonItem);
      deletButtonItem.remove();
  } else {
    deletButtonItem.closest('.element').setAttribute("id" ,id);
  }} ;
//--------------------------------------------------------------------
//кнопка Лайк карточки
export function likeElem (evt) {
    if (evt.target.closest('.element__button')) {
      likeServerCardItem(requestFromServer, evt.target.closest('.element').id);
      evt.target.classList.toggle('element__button_active');
    }
};
  
//кнопка Удалить карточку
export function deletElem (evt) {
    if (evt.target.closest('.element__del-button')) {
      deletServerCardItem(requestFromServer, evt.target.closest('.element').id)
      //console.log(evt.target.closest('.element').id);
      evt.target.closest('.element').remove();      
    }
};

export function handleItemFormSubmit(evt) {
    evt.preventDefault(); 
    elements.prepend(createCard(linkCard.value, nameCard.value));
    sendingServerCardItem(requestFromServer, {
      link: linkCard.value,
      name: nameCard.value
    });    
    //elements.addEventListener('click', deletElem());
    closePopup(popupItem);
};
  
export function editProfInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameImput.value;
    profileSubtitle.textContent = hobbiInput.value;
    sendingServerProfileInfo(requestFromServer, {
      name: nameImput.value,
      about: hobbiInput.value
    });
    closePopup(popupProfile);
};