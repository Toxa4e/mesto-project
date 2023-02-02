export const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
};

const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, validationSettings) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}
if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
} else {
  hideInputError(formElement, inputElement, validationSettings);
}
}; 

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement, validationSettings);
  //Добавил обработчик reset
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
     toggleButtonState(inputList, buttonElement, validationSettings);
    }, 0);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}; 