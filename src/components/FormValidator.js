export class FormValidator {
  constructor(data, element) {
    this.data = data;
    this.element = element;
    this._inputList = Array.from(
      this.element.querySelectorAll(this.data.inputSelector)
    );
    this._submitButton = this.element.querySelector(
      this.data.submitButtonSelector
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setActualButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this.data.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "disabled");
    } else {
      this._submitButton.classList.remove(this.data.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.element.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this.data.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this.element.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = "";
    inputElement.classList.remove(this.data.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._setActualButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._setActualButtonState();
      });
    });
  }

  resetValidation() {
    this._setActualButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
