export class FormValidator {
  constructor(validationSettings, form) {
    //      this._validationSettings = validationSettings;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(validationSettings.inputSelector));
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._buttonElement = this._form.querySelector(validationSettings.submitButtonSelector);
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;

  }

  enableValidation() {
    this.setEventListeners();
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  setEventListeners() {
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState();
    //Добавил обработчик reset
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  resetValidation() {
    this._toggleButtonState(); //<== управляем кнопкой ==

    this._inputList.forEach((inputElement) => {
      this.hideInputError(inputElement) //<==очищаем ошибки ==
    });

  }
};