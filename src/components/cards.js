import { nameImput , hobbiInput ,  popupItem  , popupProfile , profileTitle , profileSubtitle , elements , elementTemplate , linkCard , nameCard , requestFromServer} from "./const.js";
//import { initialCards } from './initialCards.js';
import { closePopup } from "./modal.js";
import { sendingServerProfileInfo , sendingServerCardItem , deletServerCardItem , likeServerCardItem , deletLikeServerCardItem , myNameProfile} from "./api.js";



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
export function addServerItem(data, myNameProfile) {
  for (let i = 0; i < data.length; i++) {
    elements.prepend(createCard(data[i].link, data[i].name));
    deletButtonElementDelet(data[i].owner.name, data[i]._id);
    numberLikes (data[i].likes.length);
    likeButonServer(data[i].likes, myNameProfile.name);
  }  
};

function deletButtonElementDelet(data, id) {  //убирает кнопку удаления для карточек от других пользователей
  const deletButtonItem = document.querySelector('.element__del-button');
  deletButtonItem.closest('.element').setAttribute("card-id" ,id);
  if (data !== profileTitle.textContent){
    deletButtonItem.remove();
  } 
};

function likeButonServer(data, myNameProfile) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === myNameProfile) {
      document.querySelector('.element__button').classList.add('element__button_active');
      return;
    }
  }
};

function numberLikes (data) {
  const spanLike = document.querySelector('.element__like-number');
  if (data !== 0){
    spanLike.textContent = data;
  }
};

//кнопка Лайк карточки c Отправкой
export function likeElem (evt) {
  if (evt.target.closest('.element__button')) {
    //console.log(evt.target.closest('.element').getAttribute("card-id"));
    let likeNumber = evt.target.closest('.element__button').nextElementSibling.textContent;

    if (!evt.target.classList.contains('element__button_active')) {
      evt.target.classList.add('element__button_active');
      evt.target.closest('.element__button').nextElementSibling.textContent = Number(likeNumber) + 1;
      likeServerCardItem(requestFromServer, evt.target.closest('.element').getAttribute("card-id"));
    } else {
      evt.target.classList.remove('element__button_active');
      evt.target.closest('.element__button').nextElementSibling.textContent = Number(likeNumber) - 1;
      deletLikeServerCardItem(requestFromServer, evt.target.closest('.element').getAttribute("card-id"));
    }
  }
};

  
//кнопка Удалить карточку
export function deletElem (evt) {
    if (evt.target.closest('.element__del-button')) {
      deletServerCardItem(requestFromServer, evt.target.closest('.element').getAttribute("card-id"));
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