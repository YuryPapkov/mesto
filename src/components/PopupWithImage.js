import Popup from './Popup.js';
export default class PopupWithImage extends Popup {

    open(name, link) {
        super.open();
        const image = this._modal.querySelector('.popup__image');
        image.setAttribute('src', '' + link);
        image.alt = 'фото ' + name;
        this._modal.querySelector('.popup__subtitle').textContent = name;

    }

}
