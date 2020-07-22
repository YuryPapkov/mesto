const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardContainer = popupNewCard.querySelector('.popup__container');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close-button');

const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');

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

    function handlePreviewPicture(name, link) {
        popupImageImage.setAttribute('src', '' + link);
        popupImageSubtitle.textContent = name;
        toggleModal(popupImage);
    }
    newCard.querySelector('.card__like-button').addEventListener('click', makeDark);
    newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    newCard.querySelector('.card__image').addEventListener('click', () => handlePreviewPicture(name, link));
    insertNewCard(newCard);
}

function insertNewCard(item) {
    cards.prepend(item);
}

function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
}

function popupEditToggle() {
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    toggleModal(popupEdit);
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
    toggleModal(popupNewCard);
}

function makeDark() {
    const clickedItem = event.target;
    clickedItem.classList.toggle('card__like-button_pressed');
}

function deleteCard() {
    const clickedItem = event.target;
    clickedItem.parentElement.remove();
}

editButton.addEventListener('click', popupEditToggle);
addButton.addEventListener('click', () => toggleModal(popupNewCard));

popupEditCloseButton.addEventListener('click', popupEditToggle);
popupNewCardCloseButton.addEventListener('click', () => toggleModal(popupNewCard));
popupImageCloseButton.addEventListener('click', () => toggleModal(popupImage));

popupEditContainer.addEventListener('submit', formEditSubmitHandler);
popupNewCardContainer.addEventListener('submit', formNewCardSubmitHandler);

initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});
