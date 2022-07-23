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
      buttonElement.removeAttribute("disabled");
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
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners () {
    const inputList = Array.from(this.element.querySelectorAll(this.data.inputSelector));
    const buttonElement = this.element.querySelector(this.data.submitButtonSelector);
    this._setActualButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {
        this._checkInputValidity(inputElement);
        this._setActualButtonState(inputList, buttonElement);
      });
    });
  }
}
