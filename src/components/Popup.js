export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    //Открытие Попапа
    open() {
        this._popup.classList.add('popup_opened');
        this.addEventListeners();
    }
    //Закрытие Попапа
    close() {
        this._popup.classList.remove('popup_opened');
        this.removeEventListeners();
    }

    //метод закрытия попапа клавишей Esc
    _handleEscape = (evt) => {
        if (evt.key === 'Escape')
            this.close();
    }
    //метод закрытия попапа на крестик или оверлей
    _handlePopupClose = (evt) => {
        if (evt.target.closest('.popup__close') || evt.target.classList.contains('popup'))
            this.close();
    }

    //метод Добовление слушателей при открытии Попапа
    addEventListeners() {
        this._popup.addEventListener('mousedown', this._handlePopupClose);
        document.addEventListener('keyup', this._handleEscape);
    }
    //метод Удаления слушателей при закрытии Попапа
    removeEventListeners() {
        this._popup.removeEventListener('mousedown', this._handlePopupClose);
        document.removeEventListener('keyup', this._handleEscape);
    }
};