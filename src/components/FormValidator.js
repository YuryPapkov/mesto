export default class FormValidator {
    constructor(validationData, formElement) {
        this._inputSelector = validationData.inputSelector;
        this._submitButtonSelector = validationData.submitButtonSelector;
        this._inactiveButtonClass = validationData.inactiveButtonClass;
        this._inputErrorClass = validationData.inputErrorClass;
        this._errorClass = validationData.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._getInputList();
        this._getSubmitButtonElement();
        this._formElement.addEventListener('submit', (evt) => { evt.preventDefault() });
        this._setEventListeners();
    }

    clearErrors() {
        this._inputList.forEach((item) => { this._hideInputError(item); });
        this._toggleSubmitButtonState(this._submitButton);
    }

    _getInputList() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._inputList = inputList;
        return this._inputList;
    }
    _getSubmitButtonElement() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._buttonElement = buttonElement;
        return this._buttonElement;
    }

    _getErrorElement(inputElement) {
        const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.name}`);
        return errorElement;
    }

    _setEventListeners() {
        this._inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._checkInputValidity(item);
                this._toggleSubmitButtonState();
            });
            item.addEventListener('focus', () => {
                this._toggleSubmitButtonState();
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    _hideInputError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._getErrorElement(inputElement);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    _toggleSubmitButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _hasInvalidInput() {
        if (this._inputList.some(item => !item.validity.valid)) {
            return true;
        } else {
            return false;
        }
    }
}
