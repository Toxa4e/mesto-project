//import { checkServerResponse } from "./units.js";
import { requestFromServer } from "./const.js";

export default class Api {
    constructor(requestFromServer) {
        this._fetchUrl = requestFromServer.baseUrl;
        this._headers = requestFromServer.headers;
    }

    _checkServerResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status, res.statusText);
    }

    _request(url, options) {
        //подстановка URL 
        const compileLink = `${this._fetchUrl}${url}`;
        return fetch(compileLink, options).then(this._checkServerResponse);
    }

/*    _loadGetServerData(setting){
        return Promise.all([getServerProfileInfo(setting), getServerCardsItem(setting)])
      };
      
      //Получение карточек с сервера
    _getServerCardsItem = () => request(`/cards`, {headers: requestFromServer.headers});
      //Получение информации пользователя
    _getServerProfileInfo = () => request(`/users/me`, {headers: requestFromServer.headers});
    */

    //Отправка данных с модального окна о пользователе
    sendingServerProfileInfo({nameImput, hobbiInput}){ 
        this._request(`/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: nameImput,
                about: hobbiInput 
            })
        });
    }
    //Изменение аватара
    setAvatarProfile(idItem) { 
        this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: idItem  //без .link
            })
        });
    }
    //Отправка данных с Добавление новой карточки
    sendingServerCardItem(linkCard, nameCard) {
        this._request(`/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: nameCard,
                link: linkCard
            })
        });
    }
    //Удаление карточки с сервера
    deletServerCardItem(idItem) {
        this._request(`/cards/${idItem}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    //Лайк карточки с сервера
    likeServerCardItem(idItem) {
        this._request(`/cards/likes/${idItem}`, {
            method: 'PUT',
            headers: this._headers,
        });
    } 

    //Удаление Лайка карточки с сервера
    deletLikeServerCardItem(idItem) {
        this._request(`/cards/likes/${idItem}`, {
            method: 'DELETE',
            headers: requestFromServer.headers,
        }); 
    }
}