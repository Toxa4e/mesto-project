//import { addServerItem , createCard} from "./cards.js";
//import { profileTitle , profileSubtitle , profileImage , elements} from "./const.js";
//import { renderLoading } from "./modal.js";
import { checkServerResponse } from "./units.js";
import { requestFromServer } from "./const.js";

//-----------------------------------------
export function loadGetServerData(setting){
  return Promise.all([getServerProfileInfo(setting), getServerCardsItem(setting)])
};

function request(url, options) {
  const compileLink = `${requestFromServer.fetchUrl}${url}`;
  return fetch(compileLink, options).then(checkServerResponse);
};
//Получение карточек с сервера
const getServerCardsItem = () => request(`/cards`, {headers: requestFromServer.headers});
//Получение информации пользователя
const getServerProfileInfo = () => request(`/users/me`, {headers: requestFromServer.headers});

//Отправка данных с модального окна о пользователе
export const sendingServerProfileInfo = (nameImput, hobbiInput) => request(`/users/me`, {
  method: 'PATCH',
  headers: requestFromServer.headers,
  body: JSON.stringify({
    name: nameImput,
    about: hobbiInput 
  })
});

//Изменение аватара
export const setAvatarProfile = (idItem) => request(`/users/me/avatar`, {
  method: 'PATCH',
  headers: requestFromServer.headers,
  body: JSON.stringify({
    avatar: idItem  //без .link
  })
});

//Отправка данных с Добавление новой карточки
export const sendingServerCardItem = (linkCard, nameCard) => request(`/cards`, {
  method: 'POST',
  headers: requestFromServer.headers,
  body: JSON.stringify({
    name: nameCard,
    link: linkCard
  })
});

//Удаление карточки с сервера
export const deletServerCardItem = (idItem) => request(`/cards/${idItem}`, {
    method: 'DELETE',
    headers: requestFromServer.headers,
});

//Лайк карточки с сервера
export const likeServerCardItem = (idItem) => request(`/cards/likes/${idItem}`, {
  method: 'PUT',
  headers: requestFromServer.headers,
}); 

//Удаление Лайка карточки с сервера
export const deletLikeServerCardItem = (idItem) => request(`/cards/likes/${idItem}`, {
  method: 'DELETE',
  headers: requestFromServer.headers,
}); 

//---------------------------------------------


/*//Получение карточек с сервера
export function getServerCardsItem(requestFromServer) {
  return fetch(`${requestFromServer.fetchUrl}/cards`, {
    headers: requestFromServer.headers,
  })
  .then(serverResponse)
};*/

/*//Получение информации пользователя
export function getServerProfileInfo(requestFromServer) {
  return fetch(`${requestFromServer.fetchUrl}/users/me`, {
    headers: requestFromServer.headers,
  })
  .then(serverResponse)
};*/


/*//Отправка данных с модального окна о пользователе
export function sendingServerProfileInfo(requestFromServer, dataInput, submitButtonBefore, submitButtonAfter) {
  renderLoading(true, submitButtonBefore, submitButtonAfter);
  return fetch(`${requestFromServer.fetchUrl}/users/me`, {
    method: 'PATCH',
    headers: requestFromServer.headers,
    body: JSON.stringify({
      name: dataInput.name,
      about: dataInput.about 
    })
  })
  .then(serverResponse)
  .then((res) => {console.log(res); })
  .catch((err) => {console.log(`Ошибка: ${err}`);})
  .finally(() => {renderLoading(false, submitButtonBefore, submitButtonAfter);});
};*/

/*//Отправка данных с Добавление новой карточки
export function sendingServerCardItem(requestFromServer, dataInput, submitButtonBefore, submitButtonAfter) {
  renderLoading(true, submitButtonBefore, submitButtonAfter);
  return fetch(`${requestFromServer.fetchUrl}/cards`, {
    method: 'POST',
    headers: requestFromServer.headers,
    body: JSON.stringify({
      name: dataInput.name,
      link: dataInput.link
    })
  })
  .then(serverResponse)
  .then((res) => {console.log(res);
    elements.prepend(createCard(res.link, res.name, res._id)); //после получения ответа создаем карточку
  })
  .catch((err) => {console.log(`Ошибка: ${err}`);})
  .finally(() => {renderLoading(false, submitButtonBefore, submitButtonAfter);});
};*/

//Удаление карточки с сервера
/*export function deletServerCardItem(requestFromServer, idItem) {
  return fetch(`${requestFromServer.fetchUrl}/cards/${idItem}`, {
    method: 'DELETE',
    headers: requestFromServer.headers,
  })  
  .then(serverResponse)
  .then((res) => {console.log(res);})
  .catch((err) => {console.log(`Ошибка: ${err}`);})
};*/

//Лайк карточки с сервера
/*export function likeServerCardItem(requestFromServer, idItem) {
  return fetch(`${requestFromServer.fetchUrl}/cards/likes/${idItem}`, {
    method: 'PUT',
    headers: requestFromServer.headers,
  })
  .then(serverResponse)
  .then((res) => {console.log(res);})
  .catch((err) => {console.log(`Ошибка: ${err}`);})
};*/

//Удаление Лайка карточки с сервера
/*export function deletLikeServerCardItem(requestFromServer, idItem) {
  return fetch(`${requestFromServer.fetchUrl}/cards/likes/${idItem}`, {
    method: 'DELETE',
    headers: requestFromServer.headers,
  })  
  .then(serverResponse)
  .then((res) => {console.log(res);})
  .catch((err) => {console.log(`Ошибка: ${err}`);})
};*/

/*//Изменение аватара
export function setAvatarProfile(requestFromServer, idItem, submitButtonBefore, submitButtonAfter) {
  renderLoading(true, submitButtonBefore, submitButtonAfter);
  return fetch(`${requestFromServer.fetchUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: requestFromServer.headers,
    body: JSON.stringify({
      avatar: idItem  //без .link
    })
  })
  .then(serverResponse)
  .then((res) => {console.log(res);})
  .catch((err) => {console.log(`Ошибка: ${err}`);})
  .finally(() => {renderLoading(false, submitButtonBefore, submitButtonAfter);});
};*/