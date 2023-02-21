import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        //используем конструктор Popup
        super(popupSelector);
        //Модернезируем конструктор
        this._image = document.querySelector('.figure__picture');    //получаем ссылку картинки карточки
        this._title = document.querySelector('.figure__figcaption');  //получаем описание карточки
    }

    open({ link, name }) {
        super.open();
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
    }
}

