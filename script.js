const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardContainer = popupNewCard.querySelector('.popup__container');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close-button');

const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupSubtitle = imagePopup.querySelector('.image-popup__subtitle');
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close-button');

const cards = document.querySelector('.cards');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const nameInput = document.querySelector('.popup__input_type_name');
const occupationInput = document.querySelector('.popup__input_type_occupation');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addCard(name, link) {
    const cardTemplate = document.querySelector('#place').content;
    const newCard = cardTemplate.cloneNode(true);
    const newCardImage = newCard.querySelector('.card__image')
    newCardImage.src = link;
    newCardImage.alt = name;
    newCard.querySelector('.card__title').textContent = name;
    insertNewCard(newCard);
    refreshCardButtons();
}

function insertNewCard(item) {
    cards.prepend(item);
}

function refreshCardButtons() {
    const cardLikeButton = cards.querySelectorAll('.card__like-button');
    cardLikeButton.forEach((item) => {
        item.addEventListener('click', makeDark);
    });
    const cardDeleteButton = cards.querySelectorAll('.card__delete-button');
    cardDeleteButton.forEach((item) => {
        item.addEventListener('click', deleteCard);
    });
    const cardImage = cards.querySelectorAll('.card__image');
    cardImage.forEach((item) => {
        item.addEventListener('click', imagePopupToggle);
    });
}

function popupEditToggle() {
    if (popupEdit.classList.contains('popup_opened')) {
        popupEdit.classList.remove('popup_opened');
    } else {
        popupEdit.querySelector('.popup__text').textContent = 'Редакторовать профиль';
        nameInput.value = profileName.textContent;
        occupationInput.value = profileOccupation.textContent;
        popupEdit.classList.add('popup_opened');
    }
}

function popupNewCardToggle() {
    if (popupNewCard.classList.contains('popup_opened')) {
        popupNewCard.classList.remove('popup_opened');
    } else {
        popupNewCard.classList.add('popup_opened');
    }
}

function imagePopupToggle() {
    if (imagePopup.classList.contains('image-popup_opened')) {
        imagePopup.classList.remove('image-popup_opened');
    } else {
        const clickedItem = event.target;
        imagePopupImage.setAttribute('src', '' + clickedItem.getAttribute("src"));
        imagePopupSubtitle.textContent = clickedItem.getAttribute("alt");
        imagePopup.classList.add('image-popup_opened');
    }
}

function formEditSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    popupEditToggle();
}

function formNewCardSubmitHandler(evt) {
    evt.preventDefault();
    addCard(placeInput.value, linkInput.value);
    popupNewCardToggle();
}

function makeDark() {
    const clickedItem = event.target;
    clickedItem.classList.add('card__like-button_pressed');
}

function deleteCard() {
    const clickedItem = event.target;
    clickedItem.parentElement.remove();
    refreshCardButtons();
}

editButton.addEventListener('click', popupEditToggle);
addButton.addEventListener('click', popupNewCardToggle);

popupEditCloseButton.addEventListener('click', popupEditToggle);
popupNewCardCloseButton.addEventListener('click', popupNewCardToggle);
imagePopupCloseButton.addEventListener('click', imagePopupToggle);

popupEditContainer.addEventListener('submit', formEditSubmitHandler);
popupNewCardContainer.addEventListener('submit', formNewCardSubmitHandler);

initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});
