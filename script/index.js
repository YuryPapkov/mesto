const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = Array.from(document.querySelectorAll('.popup'));
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

function handlePreviewPicture(name, link) {
    popupImageImage.setAttribute('src', '' + link);
    popupImageSubtitle.textContent = name;
    toggleModal(popupImage);
}

function addCard(name, link) {
    const cardTemplate = document.querySelector('#place').content;
    const newCard = cardTemplate.cloneNode(true);
    const newCardImage = newCard.querySelector('.card__image')
    newCardImage.src = link;
    newCardImage.alt = name;
    newCard.querySelector('.card__title').textContent = name;
    newCard.querySelector('.card__like-button').addEventListener('click', makeDark);
    newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    newCardImage.addEventListener('click', () => handlePreviewPicture(name, link));
    return newCard;
}

function insertNewCard(item) {
    cards.prepend(item);
}

function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
    escapeHandler.openedModal = modal;
    if (modal.classList.contains('popup_opened')) {
        document.addEventListener('keyup', escapeHandler);
    } else {
        document.removeEventListener('keyup', escapeHandler);
        //очистка error-классов формы при закрытии модального окна
        const openedForm = modal.querySelector('.popup__container');
        if (openedForm.classList.contains('popup__container_type_input')) {
            clearErrors(openedForm);
        };
    }
}

function clearErrors(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const submitButton = form.querySelector('.popup__save-button');
    inputList.forEach((item) => { hideInputError(form, item); });
    toggleSubmitButtonState(inputList, submitButton);
}

function escapeHandler(evt) {
    if (evt.key === 'Escape') {
        toggleModal(escapeHandler.openedModal);
    }
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
    const newCard = addCard(placeInput.value, linkInput.value);
    insertNewCard(newCard);
    placeInput.value = '';
    linkInput.value = '';
    toggleModal(popupNewCard);
}

function makeDark(evt) {
    const clickedItem = evt.target;
    clickedItem.classList.toggle('card__like-button_pressed');
}

function deleteCard(evt) {
    const clickedItem = evt.target;
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
    const newCard = addCard(item.name, item.link);
    insertNewCard(newCard);
});
//Закрытие модального окна кликом по popup
popup.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            toggleModal(evt.target);
        }
    });
});