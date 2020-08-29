export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._modal = document.querySelector(popupSelector);
        this._closeButton = this._modal.querySelector('.popup__close-button');
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // modal.classList.toggle('popup_opened');
    // escapeHandler.openedModal = modal;
    // //находим форму в данном модальном окне
    // const openedContainer = modal.querySelector('.popup__container');
    // const modalContainsForm = openedContainer.classList.contains('popup__container_type_input');
    // if (modal.classList.contains('popup_opened')) {
    //     document.addEventListener('keyup', escapeHandler);
    //     if (modalContainsForm) {
    //         //ставим фокус на первый инпут формы
    //         setTimeout(function() { openedContainer.querySelector('.popup__input').focus(); }, 100);
    //     }
    // } else {
    //     document.removeEventListener('keyup', escapeHandler);
    //     //очистка error-классов формы и сброс формы при закрытии модального окна
    //     if (modalContainsForm) {
    //         openedContainer.validator.clearErrors();
    //         openedContainer.reset();
    //     };
    // }


    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            //console.log(this);
            this.close();
        }
    }
    _setEventListeners() {
        this._closeButton.addEventListener('click', this.close);
    }


    open() {
        this._modal.classList.add('popup_opened');
        this._setEventListeners();
        document.addEventListener('keyup', this._handleEscClose);
        this._modal.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
                //toggleModal(evt.target);
            }
        });
    }

    close() {
        this._modal.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);

    }
}
