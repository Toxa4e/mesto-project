//import { checkServerResponse } from "./units.js";
import { requestFromServer } from "../utils/const.js";

export class Api {
    constructor(requestFromServer) {
        this._fetchUrl = requestFromServer.fetchUrl;
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

    _loadGetServerData() {
        return Promise.all([this.getServerProfileInfo(), this.getServerCardsItem()])
    };

    //Получение карточек с сервера
    getServerCardsItem = () => this._request(`/cards`, { headers: this._headers });
    //Получение информации пользователя
    getServerProfileInfo = () => this._request(`/users/me`, { headers: this._headers });


    //Отправка данных с модального окна о пользователе
    sendingServerProfileInfo({ nameImput, hobbiInput }) {
        return this._request(`/users/me`, {
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
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: idItem  //без .link
            })
        });
    }
    //Отправка данных с Добавление новой карточки
    sendingServerCardItem(linkCard, nameCard) {
        return this._request(`/cards`, {
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
        return this._request(`/cards/${idItem}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    toggleLike = (itemId, isLiked) => {
        return this._request(`/cards/likes/${itemId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
    }
}