import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor({popupSelector, handleFormSubmit}) {
        //используем конструктор Popup
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');  // достаём все элементы полей   
        this._submitButton = this._form.querySelector('.form__submit');
        this._initialText = this._submitButton.textContent;

    }
    close (){
        super.close();
//        this.form.reset(); //сбрасывем форму
    }

    _getInputValues() {
        this._formValues = {};      
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });      
        // возвращаем объект значений
        return this._formValues;
      } 

    addEventListeners() {
        super.addEventListeners();//добовляем слушатели при открыти Попапа
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
        });
    }

    renderLoading(isLoading, loadingText = "Сохранение...") {
        if (isLoading) {
            this._submitButton.textContent = loadingText
        } else {
            this._submitButton.textContent = this._initialText
        }
    };
}