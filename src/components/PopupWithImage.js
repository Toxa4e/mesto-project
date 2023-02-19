import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    #title;
    #image;

    constructor({ popupSelector }) {
        //используем конструктор Popup
        super(popupSelector);
        //Модернезируем конструктор
        this.#image = document.querySelector('.figure__picture');    //получаем ссылку картинки карточки
        this.#title = document.querySelector('.figure__figcaption');  //получаем описание карточки
    }

    open({ link, name }) {
        super.open();
        this.#image.src = link;
        this.#image.alt = name;
        this.#title.textContent = name;
    }
}

