export default class FormValidator {
    constructor({ validationSettings, form }) {
      this.validationSettings = validationSettings;
      this.form = form;
    }

    enableValidation () {
        const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
        formList.forEach((formElement) => {
            this.setEventListeners(formElement);
        });
    }

    showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.validationSettings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.validationSettings.errorClass);
    }

    hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.validationSettings.inputErrorClass);
        errorElement.classList.remove(this.validationSettings.errorClass);
        errorElement.textContent = '';
    }

    isValid(formElement, inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
          } else {
            inputElement.setCustomValidity("");
          }
          if (!inputElement.validity.valid) {
            this.showInputError(formElement, inputElement, inputElement.validationMessage);
          } else {
            this.hideInputError(formElement, inputElement);
          }
    }

    setEventListeners (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this.validationSettings.inputSelector));
        const buttonElement = formElement.querySelector(this.validationSettings.submitButtonSelector);

        // деактивируем кнопку при 1й загрузке сайта
        this.toggleButtonState(inputList, buttonElement);
        //Добавил обработчик reset
        formElement.addEventListener('reset', () => {
            setTimeout(() => {
            this.toggleButtonState(inputList, buttonElement);
            }, 0);
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this.isValid(formElement, inputElement);
            this.toggleButtonState(inputList, buttonElement);
            });
        });
    }

    hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          });
    }

    toggleButtonState(inputList, buttonElement) {
        if (this.hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(this.validationSettings.inactiveButtonClass);
      } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this.validationSettings.inactiveButtonClass);
      }
    }
}