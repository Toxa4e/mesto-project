import { checkServerResponse } from "./units.js";
import { requestFromServer } from "./const.js";

function request(url, options) {
  //подстановка URL 
  const compileLink = `${requestFromServer.fetchUrl}${url}`;
  return fetch(compileLink, options).then(checkServerResponse);
};

export function loadGetServerData(setting){
  return Promise.all([getServerProfileInfo(setting), getServerCardsItem(setting)])
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