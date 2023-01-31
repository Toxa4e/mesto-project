import { nameImput , hobbiInput ,  popupItem  , popupProfile , profileTitle , profileSubtitle , elements , elementTemplate , linkCard , nameCard , requestFromServer} from "./const.js";
//import { initialCards } from './initialCards.js';
import { closePopup } from "./modal.js";
import { sendingServerProfileInfo , sendingServerCardItem , deletServerCardItem , likeServerCardItem , deletLikeServerCardItem} from "./api.js";



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
    //console.log(data[i].likes);
    //console.log(data[i].likes.length);
    numberLikes (data[i].likes.length);
    likeButonServer(data[i].likes, data[i].owner.name);
  }  
};

function deletButtonElementDelet(data, id) {  //убирает кнопку удаления для карточек от других пользователей
  const deletButtonItem = document.querySelector('.element__del-button');
  deletButtonItem.closest('.element').setAttribute("card-id" ,id);
  if (data !== profileTitle.textContent){
    //console.log(data[i].owner.name);
    //console.log(deletButtonItem);
    deletButtonItem.remove();
  } 
};

function likeButonServer(data, ownerName) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === ownerName) {
      //const likeActive = document.querySelector('.element__button');
      //likeActive.classList.add('element__button_active');
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
//--------------------------------------------------------------------
//кнопка Лайк карточки c Отправкой
export function likeElem (evt) {
  if (evt.target.closest('.element__button')) {
    console.log(evt.target.closest('.element').getAttribute("card-id"));
    //const spanLike = evt.target.closest('.element__like-number');
    //console.log('click');    
    let likeNumber = evt.target.closest('.element__button').nextElementSibling.textContent;
    console.log(likeNumber + 1);

    if (!evt.target.classList.contains('element__button_active')) {
      console.log('+1');
      evt.target.classList.add('element__button_active');
      evt.target.closest('.element__button').nextElementSibling.textContent = Number(likeNumber) + 1;
      likeServerCardItem(requestFromServer, evt.target.closest('.element').getAttribute("card-id"));
    } else {
      console.log('-1');
      evt.target.classList.remove('element__button_active');
      evt.target.closest('.element__button').nextElementSibling.textContent = Number(likeNumber) - 1;
      deletLikeServerCardItem(requestFromServer, evt.target.closest('.element').getAttribute("card-id"));
    }
  }
};

  
//кнопка Удалить карточку
export function deletElem (evt) {
    if (evt.target.closest('.element__del-button')) {
      deletServerCardItem(requestFromServer, evt.target.closest('.element').getAttribute("card-id"))
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