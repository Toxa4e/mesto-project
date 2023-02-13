import { Popup } from "./Popup.js";
import { pictureElement, figcaptionElement } from "./const.js";

export default class PopupWithImage extends Popup {
    #title;
    #image;

    constructor(data, popupSelector) {
        //используем конструктор Popup
        super(popupSelector);
        //Модернезируем конструктор
        this.#image = data.link;    //получаем ссылку картинки карточки
        this.#title = data.name;    //получаем описание карточки
    }

    open() {
        super.open();
        pictureElement.src = this.#image; 
        pictureElement.alt = this.#title; 
        figcaptionElement.textContent = this.#title; 
    }
}

