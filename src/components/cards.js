import { nameImput , hobbiInput ,  popupItem  , popupProfile , profileTitle , profileSubtitle , elements , elementTemplate , linkCard , nameCard , requestFromServer , popupAvatar , linkAvatar , profileImage} from "./const.js";
import { closePopup } from "./modal.js";
import { sendingServerProfileInfo , sendingServerCardItem , deletServerCardItem , likeServerCardItem , deletLikeServerCardItem , setAvatarProfile} from "./api.js";



// тут создаем карточку и возвращаете её  
export function createCard(link, name, id) { 
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое elementTemplate
  // наполняем содержимым (карточки)
  elementElement.querySelector('.element__photo').src = link;
  elementElement.querySelector('.element__photo').alt = name;        
  elementElement.querySelector('.element__title').textContent = name;
  elementElement.setAttribute("card-id" ,id);
  
  return elementElement;
};
//--------------------------------------------------------------

//создаем массив карточек
export function addServerItem(data, myNameProfile) {
  for (let i = 0; i < data.length; i++) {
    elements.prepend(createCard(data[i].link, data[i].name, data[i]._id));
    deletButtonElementDelet(data[i].owner.name);
    numberLikes (data[i].likes.length);
    likeButonServer(data[i].likes, myNameProfile.name);
  }  
};

function deletButtonElementDelet(data) {
  if (data !== profileTitle.textContent){
    document.querySelector('.element__del-button').remove();
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
  //const spanLike = document.querySelector('.element__like-number');
  if (data !== 0){
    //spanLike.textContent = data;
    document.querySelector('.element__like-number').textContent = data;
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

//Форма создания карточек
export function handleItemFormSubmit(evt) {
    evt.preventDefault(); 
    const submit = evt.target.querySelector('.form__submit').textContent;
    sendingServerCardItem(requestFromServer, {
      link: linkCard.value,
      name: nameCard.value
    }, submit, evt.target.querySelector('.form__submit'));
    closePopup(popupItem);
};
  
//Форма редактирования профиля
export function editProfInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameImput.value;
    profileSubtitle.textContent = hobbiInput.value;
    const submit = evt.target.querySelector('.form__submit').textContent;
    sendingServerProfileInfo(requestFromServer, {
      name: nameImput.value,
      about: hobbiInput.value
    }, submit, evt.target.querySelector('.form__submit'));
    closePopup(popupProfile);
};

export function edidAvatar(evt) {
  evt.preventDefault();  
  profileImage.src = linkAvatar.value;
  const submit = evt.target.querySelector('.form__submit').textContent;
  setAvatarProfile(requestFromServer, linkAvatar.value, submit, evt.target.querySelector('.form__submit'));
  closePopup(popupAvatar);
}
