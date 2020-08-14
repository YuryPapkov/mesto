export default class Card {
    constructor(data, templateSelector, popupHandler) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._popupHandler = popupHandler;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
        return cardElement;
    }

    _makeDark(evt) {
        const clickedItem = evt.target;
        clickedItem.classList.toggle('card__like-button_pressed');
    }

    _deleteCard(evt) {
        const clickedItem = evt.target;
        clickedItem.parentElement.remove();
    }

    renderCard() {
        this._element = this._getTemplate();
        const newCardImage = this._element.querySelector('.card__image');
        newCardImage.src = this._link;
        newCardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__like-button').addEventListener('click', this._makeDark);
        this._element.querySelector('.card__delete-button').addEventListener('click', this._deleteCard);
        newCardImage.addEventListener('click', () => this._popupHandler(this._name, this._link));
        return this._element;
    }
}
