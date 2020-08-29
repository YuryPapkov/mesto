import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitButton = this._modal.querySelector('.popup__save-button');
        this._form = this._modal.querySelector('.popup__container');
        this._submitHandler = submitHandler;
        this._inputList = Array.from(this._modal.querySelectorAll('.popup__input'));
        this._submitHandlerWithData = this._submitHandlerWithData.bind(this);
    }

    _getInputValues() {
        const inputValuesObj = {};
        this._inputList.forEach(item => {
            inputValuesObj[item.name] = item.value;
        })
        return inputValuesObj;
    }

    _submitHandlerWithData() {
        this._inputValues = this._getInputValues();
        this._submitHandler(this._inputValues);
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandlerWithData);


    }
    close() {
        this._form.removeEventListener('submit', this._submitHandlerWithData);
        super.close();
        this._form.validator.clearErrors();
        this._form.reset();


    }
}
