export class FormValidator {
  constructor(data, element) {
    this.data = data;
    this.element = element;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setActualButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.data.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this.data.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "disabled");
    }
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this.element.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this.data.inputErrorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this.element.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(this.data.inputErrorClass);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this.element,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(this.element, inputElement, this.data);
    }
  }

  _setEventListeners () {
    const inputList = Array.from(this.element.querySelectorAll(this.data.inputSelector));
    const buttonElement = this.element.querySelector(this.data.submitButtonSelector);
    this._setActualButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(inputElement);
        this._setActualButtonState(inputList, buttonElement);
      });
    });
  }
}


// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const setActualButtonState = (inputList, buttonElement, formData) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(formData.inactiveButtonClass);
//     buttonElement.setAttribute("disabled", "disabled");
//   } else {
//     buttonElement.classList.remove(formData.inactiveButtonClass);
//     buttonElement.removeAttribute("disabled", "disabled");
//   }
// };

// const showInputError = (formElement, inputElement, errorMessage, formData) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.textContent = errorMessage;
//   inputElement.classList.add(formData.inputErrorClass);
// };

// const hideInputError = (formElement, inputElement, formData) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.textContent = "";
//   inputElement.classList.remove(formData.inputErrorClass);
// };

// const checkInputValidity = (formElement, inputElement, formData) => {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       formData
//     );
//   } else {
//     hideInputError(formElement, inputElement, formData);
//   }
// };

// export const setEventListeners = (formElement, formData) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(formData.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     formData.submitButtonSelector
//   );
//   setActualButtonState(inputList, buttonElement, formData);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, formData);
//       setActualButtonState(inputList, buttonElement, formData);
//     });
//   });
// };
