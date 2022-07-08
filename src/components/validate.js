const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
const setActualButtonState = (inputList, buttonElement, formData) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formData.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove(formData.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled')
  }
};
const showInputError = (formElement, inputElement, errorMessage, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(formData.inputErrorClass)
};

const hideInputError = (formElement, inputElement, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(formData.inputErrorClass)
};

const checkInputValidity = (formElement, inputElement, formData) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formData);
  } else {
    hideInputError(formElement, inputElement, formData);
  }
};

export const setEventListeners = (formElement, formData) => {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector));
  const buttonElement = formElement.querySelector(formData.submitButtonSelector);
  setActualButtonState(inputList, buttonElement, formData);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formData);
      setActualButtonState(inputList, buttonElement, formData);
    });
  });
};
