import { nameImput , hobbiInput ,  popupItem  , popupProfile , profileTitle , profileSubtitle , elements , elementTemplate , linkCard , nameCard , requestFromServer , popupAvatar , profileImage} from "./const.js";
import { closePopup , openImagePopup} from "./modal.js";
import { sendingServerProfileInfo , sendingServerCardItem , deletServerCardItem , likeServerCardItem , deletLikeServerCardItem} from "./api.js";



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
    //deletButtonElementDelet(data[i].owner.name);
    //numberLikes (data[i].likes.length);
    //likeButonServer(data[i].likes, myNameProfile.name);
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
    //console.log(evt.target.closest('.element').getAttribute("card-id"));
    const likeNumber = evt.target.closest('.element__button').nextElementSibling.textContent;

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
  //const elementCard = evt.target.closest('.element')
    if (evt.target.closest('.element__del-button')) {
      console.log(evt.target.closest('.element').getAttribute("card-id"));
      return deletServerCardItem(evt.target.closest('.element').getAttribute("card-id"))
      .then(() => evt.target.closest('.element').remove())      
    }
};

//Форма создания карточек
export function handleItemFormSubmit(evt) {
    evt.preventDefault(); 
    return sendingServerCardItem(linkCard.value, nameCard.value)
    .then((data) => {
      console.log(data);
      elements.prepend(createCard(data, data.owner.owner));
      closePopup(popupItem);
    })
};
  
//Форма редактирования профиля
/*export function editProfInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameImput.value;
    profileSubtitle.textContent = hobbiInput.value;
    const submit = evt.target.querySelector('.form__submit').textContent;
    sendingServerProfileInfo(requestFromServer, {
      name: nameImput.value,
      about: hobbiInput.value
    }, submit, evt.target.querySelector('.form__submit'));
    closePopup(popupProfile);
};*/

//Форма редактирования профиля
/*export function editProfInfo(evt) {
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
