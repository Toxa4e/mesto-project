import { addServerItem } from "./cards.js";
import { profileTitle , profileSubtitle , profileImage} from "./const.js";

//-----------------------------------------
export function loadGetServerData(setting){
  Promise.all([getServerProfileInfo(setting), getServerCardsItem(setting)])
  .then(([profile, cards]) => {
    console.log(profile);
    console.log(cards);
    profileTitle.textContent = profile.name;
    profileSubtitle.textContent = profile.about;
    profileImage.src = profile.avatar;
    profileImage.alt = profile.name;
    addServerItem(cards, profile);
  }); 
}
//---------------------------------------------


//Получение карточек с сервера
export function getServerCardsItem(requestFromServer) {
  return fetch(`${requestFromServer.fetchUrl}/cards`, {
    headers: requestFromServer.headers,
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
};

//Получение информации пользователя
export function getServerProfileInfo(requestFromServer) {
  return fetch(`${requestFromServer.fetchUrl}/users/me`, {
    headers: requestFromServer.headers,
  })
  //.then(getResponse);
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
};


//Отправка данных с модального окна о пользователе
export function sendingServerProfileInfo(requestFromServer, dataInput) {
  return fetch(`${requestFromServer.fetchUrl}/users/me`, {
    method: 'PATCH',
    headers: requestFromServer.headers,
    body: JSON.stringify({
      name: dataInput.name,
      about: dataInput.about 
    })
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data);
    })
};

//Отправка данных с Добавление новой карточки
export function sendingServerCardItem(requestFromServer, dataInput) {
  return fetch(`${requestFromServer.fetchUrl}/cards`, {
    method: 'POST',
    headers: requestFromServer.headers,
    body: JSON.stringify({
      name: dataInput.name,
      link: dataInput.link
    })
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data);
    })
};

//Удаление карточки с сервера
export function deletServerCardItem(requestFromServer, idItem) {
  return fetch(`${requestFromServer.fetchUrl}/cards/${idItem}`, {
    method: 'DELETE',
    headers: requestFromServer.headers,
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data);
    })
};

//Лайк карточки с сервера
export function likeServerCardItem(requestFromServer, idItem) {
  return fetch(`${requestFromServer.fetchUrl}/cards/likes/${idItem}`, {
    method: 'PUT',
    headers: requestFromServer.headers,
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data);
    })
};

//Удаление Лайка карточки с сервера
export function deletLikeServerCardItem(requestFromServer, idItem) {
  return fetch(`${requestFromServer.fetchUrl}/cards/likes/${idItem}`, {
    method: 'DELETE',
    headers: requestFromServer.headers,
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data);
    })
};

//Изменение аватара
export function setAvatarProfile(requestFromServer, idItem) {
  return fetch(`${requestFromServer.fetchUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: requestFromServer.headers,
    body: JSON.stringify({
      avatar: idItem  //без .link
    })
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data);
    })
};