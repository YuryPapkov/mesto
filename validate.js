const validationConfig = {
    formSelector: '.popup__container_type_input',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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
enableValidation(validationConfig);
