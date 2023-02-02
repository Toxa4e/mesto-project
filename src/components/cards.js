import { popupItem  , profileTitle , elements , elementTemplate , linkCard , nameCard } from "./const.js";
import { closePopup , openImagePopup , handleSubmit} from "./modal.js";
import {  sendingServerCardItem , deletServerCardItem , likeServerCardItem , deletLikeServerCardItem} from "./api.js";



// тут создаем карточку и возвращаете её  
export function createCard(data, myNameProfile) { 
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое elementTemplate
  // поиск элементов внутри карточки
  const elementDeletButton = elementElement.querySelector('.element__del-button');
  const elementLikeCounter = elementElement.querySelector('.element__like-number');
  const elementLikeButton = elementElement.querySelector('.element__button');
  // наполняем содержимым (карточки)
  const elementPhoto = elementElement.querySelector('.element__photo');
  elementPhoto.src = data.link;
  elementPhoto.alt = data.name;        
  elementElement.querySelector('.element__title').textContent = data.name;
  elementElement.setAttribute("card-id" , data._id);
  //Добовляем слушатели
  elementElement.addEventListener('click', openImagePopup);
  elementElement.addEventListener('click', likeElem);
  elementElement.addEventListener('click', deletElem);
  //Добовление оброботчиков
  deletButtonElementDelet(data.owner.name, elementDeletButton);
  numberLikes (data.likes.length, elementLikeCounter);
  likeButonServer(data.likes, myNameProfile.name, elementLikeButton);
  //Возвращаем готовую карточку
  return elementElement;
};


//создаем массив карточек
export function addServerItem(data, myNameProfile) {
  for (let i = 0; i < data.length; i++) {
    elements.prepend(createCard(data[i], myNameProfile));
  }  
};

//Обработчик добовления кнопки удаления карточки
function deletButtonElementDelet(data, elementDeletButton) {
  if (data !== profileTitle.textContent){
    elementDeletButton.remove();
  } 
};

//Обработчик добовления количества лайков
function numberLikes (data, elementLikeCounter) {
  if (data !== 0){
    elementLikeCounter.textContent = data;
  }
};

//Обработчик кнопки лайков
function likeButonServer(data, myNameProfile, elementLikeButton) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === myNameProfile) {
      elementLikeButton.classList.add('element__button_active');
      return;
    }
  }
};

//кнопка Лайк карточки c Отправкой
export function likeElem (evt) {
  if (evt.target.closest('.element__button')) {
    if (!evt.target.classList.contains('element__button_active')) {
      return likeServerCardItem(evt.target.closest('.element').getAttribute("card-id"))
      .then((data) => {
        //console.log(data.likes);
        evt.target.classList.add('element__button_active');
        evt.target.closest('.element__button').nextElementSibling.textContent = Number(data.likes.length);
      })
      .catch((err) => {console.log(`Ошибка: ${err}`);});
    } else {
      return deletLikeServerCardItem(evt.target.closest('.element').getAttribute("card-id"))
      .then((data) => {
        //console.log(data.likes);
        evt.target.classList.remove('element__button_active');
        evt.target.closest('.element__button').nextElementSibling.textContent = Number(data.likes.length);
      })
      .catch((err) => {console.log(`Ошибка: ${err}`);});
    }
  }
};
 
//кнопка Удалить карточку
export function deletElem (evt) {
  if (evt.target.closest('.element__del-button')) {
    return deletServerCardItem(evt.target.closest('.element').getAttribute("card-id"))
    .then(() => evt.target.closest('.element').remove())
    .catch((err) => {console.log(`Ошибка: ${err}`);})      
  }
};

//Форма создания карточек
export function handleItemFormSubmit(evt) {
  function makeRequest() {
    return sendingServerCardItem(linkCard.value, nameCard.value)
    .then((data) => {
      //console.log(data);
      elements.prepend(createCard(data, data.owner));
      closePopup(popupItem);
    })
  }
  handleSubmit(makeRequest, evt);
};
