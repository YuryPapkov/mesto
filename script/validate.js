const validationConfig = {
    formSelector: '.popup__container_type_input',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


class FormValidator {
    constructor(validationData, formElement) {
        this._formSelector = validationData.formSelector;
        this._inputSelector = validationData.inputSelector;
        this._submitButtonSelector = validationData.submitButtonSelector;
        this._inactiveButtonClass = validationData.inactiveButtonClass;
        this._inputErrorClass = validationData.inputErrorClass;
        this._errorClass = validationData.errorClass;
        this._formElement = formElement;

    }
    enableValidation() {
        this._getInputList();
        this._setEventListeners();
    }

    clearErrors() {
        //const inputList = Array.from(form.querySelectorAll('.popup__input'));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList.forEach((item) => { this._hideInputError(item); });
        this._toggleSubmitButtonState(submitButton);
    }
    _getInputList() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._inputList = inputList;
        return this._inputList;
    }

    _setEventListeners() {
        //const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleSubmitButtonState(buttonElement);
        this._inputList.forEach((item) => {
            console.log(item);
            item.addEventListener('input', () => {
                this._checkInputValidity(item);
                this._toggleSubmitButtonState(buttonElement);
            });
        });
    }

    _checkInputValidity(inputElement) {
        console.log(inputElement);
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    _hideInputError(inputElement) {
        console.log(inputElement);
        const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.name}`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.name}`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }
    _toggleSubmitButtonState(buttonElement) {

        if (this._hasInvalidInput(this._inputList)) {
            console.log('invalid');
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            console.log('valid');
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }
    _hasInvalidInput() {
        //inputList.forEach((item) => {
        //    console.log(item.validity.valid);
        // });

        if (this._inputList.some(item => !item.validity.valid)) {
            return true;
        } else {
            return false;
        }
    }


}

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((item) => {
    const validator = new FormValidator(validationConfig, item);
    validator.enableValidation();
    item.validator = validator;
});



//=======================================================================
/*
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(showInputError.inputErrorClass);
    errorElement.classList.add(showInputError.errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(hideInputError.inputErrorClass);
    errorElement.classList.remove(hideInputError.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(setEventListeners.inputSelector));
    const buttonElement = formElement.querySelector(setEventListeners.submitButtonSelector);
    toggleSubmitButtonState(inputList, buttonElement);
    inputList.forEach((item) => {
        item.addEventListener('input', () => {
            checkInputValidity(formElement, item);
            toggleSubmitButtonState(inputList, buttonElement);
        });
    });
}

function enableValidation(validationObject) {
    //Деструктурируем объект
    const {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    } = validationObject;
    //Передаем функциям нужные переменные при помощи ключ-значение
    setEventListeners.inputSelector = inputSelector;
    setEventListeners.submitButtonSelector = submitButtonSelector;
    toggleSubmitButtonState.inactiveButtonClass = inactiveButtonClass;
    showInputError.inputErrorClass = inputErrorClass;
    showInputError.errorClass = errorClass;
    hideInputError.inputErrorClass = inputErrorClass;
    hideInputError.errorClass = errorClass;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((item) => {
        setEventListeners(item);
    });
}

function hasInvalidInput(inputList) {
    if (inputList.some(item => !item.validity.valid)) {
        return true;
    } else {
        return false;
    }
}

function toggleSubmitButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(toggleSubmitButtonState.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(toggleSubmitButtonState.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}
*/
//enableValidation(validationConfig);