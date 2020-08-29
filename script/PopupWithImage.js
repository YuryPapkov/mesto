import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);


    }

    open(name, link) {
        super.open();
        this._modal.querySelector('.popup__image').setAttribute('src', '' + link);
        this._modal.querySelector('.popup__subtitle').textContent = name;

    }

}
