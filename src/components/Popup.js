export default class Popup {
    constructor(popupSelector) {
        this._modal = document.querySelector(popupSelector);
        this._closeButton = this._modal.querySelector('.popup__close-button');
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close);
        this._modal.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        });
    }

    open() {
        this._modal.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._modal.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);

    }
}
