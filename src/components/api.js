import { addServerItem } from "./cards.js";
import { profileTitle , profileSubtitle , profileAvatar} from "./const.js";

//Получение карточек с сервера
export function getServerCardsItem(requestFromServer) {
  return fetch(`${requestFromServer.fetchUrl}/cards`, {
    headers: requestFromServer.headers,
  })
  .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data.length);
      console.log(data);
      addServerItem(data); // если мы попали в этот then, data — это объект
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
    .then((data) => {
      //console.log(data);
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      profileAvatar.src = data.avatar;
      profileAvatar.alt = data.name;
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