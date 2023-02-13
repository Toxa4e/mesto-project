export class Popup {
    #popup;
    constructor(popupSelector) {
      this.#popup = document.querySelector(popupSelector);
    }

    //Открытие Попапа
    open() {
        this.#popup.classList.add('popup_opened');
        this.addEventListeners();
    }
    //Закрытие Попапа
    close() {
        this.#popup.classList.remove('popup_opened');
        this.removeEventListeners();
    }

    //метод закрытия попапа клавишей Esc
    #handleEscape = (evt) => {
      if (evt.key === 'Escape') 
      this.close();
    }
    //метод закрытия попапа на крестик или оверлей
    #handlePopupClose = (evt) => {
        if (evt.target.closest('.popup__close')||evt.target.classList.contains('popup'))
        this.close();
    }

    //метод Добовление слушателей при открытии Попапа
    addEventListeners() {
        this.#popup.addEventListener('mousedown', this.#handlePopupClose);
        document.addEventListener('keyup', this.#handleEscape);
    }
    //метод Удаления слушателей при закрытии Попапа
    removeEventListeners() {
        this.#popup.removeEventListener('mousedown', this.#handlePopupClose);
        document.removeEventListener('keyup', this.#handleEscape);
    }
  };