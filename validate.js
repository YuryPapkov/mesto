const configObject = {
    formSelector: '.popup__container_type_input',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
//Деструктурируем объект
const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
} = configObject;


function showInputError(formElement, inputElement, errorMessage) {
    //console.log('fu  showInputError');
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
    //console.log('fu  hideInputError');
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';

}

function checkInputValidity(formElement, inputElement) {
    //console.log('fu  checkInputValidity');
    //console.log(inputElement.validity.valid);
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
}

function setEventListeners(formElement) {
    //console.log('fu  setEventListeners');
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleSubmitButtonState(inputList, buttonElement);
    inputList.forEach((item) => {
        item.addEventListener('input', () => {
            checkInputValidity(formElement, item);
            toggleSubmitButtonState(inputList, buttonElement);
        });
    });
}

function enableValidation() {
    //console.log('fu  enableValidation');
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((item) => {
        setEventListeners(item);
    });
}

function hasInvalidInput(inputList) {
    //какой-нибудь инпут невалидный?
    //console.log('fu  hasInvalidInput');
    if (inputList.some(item => !item.validity.valid)) {
        return true;
    } else {
        return false;
    }
}

function toggleSubmitButtonState(inputList, buttonElement) {
    //console.log('fu  toggleSubmitButtonState');
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}
enableValidation();
