export const validationSettings = {
    formSelector: '.form',//
    inputSelector: '.form__input',//
    submitButtonSelector: '.form__submit',//
    inactiveButtonClass: 'form__submit_inactive',//
    inputErrorClass: 'form__input_type_error',//
    errorClass: 'form__input-error_active'//
};

export const serverResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status, res.statusText);
  }
};