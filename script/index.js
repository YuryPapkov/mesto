import FormValidator from './FormValidator.js';
import Card from './Card.js';

const validationConfig = {
    formSelector: '.popup__container_type_input',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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

function insertNewCard(item) {
    cards.prepend(item);
}

function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
    escapeHandler.openedModal = modal;
    //находим форму в данном модальном окне
    const openedContainer = modal.querySelector('.popup__container');
    const modalContainsForm = openedContainer.classList.contains('popup__container_type_input');
    if (modal.classList.contains('popup_opened')) {
        document.addEventListener('keyup', escapeHandler);
        if (modalContainsForm) {
            //ставим фокус на первый инпут формы
            setTimeout(function() { openedContainer.querySelector('.popup__input').focus(); }, 100);
        }
    } else {
        document.removeEventListener('keyup', escapeHandler);
        //очистка error-классов формы и сброс формы при закрытии модального окна
        if (modalContainsForm) {
            openedContainer.validator.clearErrors();
            openedContainer.reset();
        };
    }
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
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    popupEditToggle();
}

function formNewCardSubmitHandler(evt) {
    const card = new Card({ name: placeInput.value, link: linkInput.value }, '#place', handlePreviewPicture);
    const cardElement = card.renderCard();
    insertNewCard(cardElement);
    placeInput.value = '';
    linkInput.value = '';
    toggleModal(popupNewCard);
}

editButton.addEventListener('click', popupEditToggle);
addButton.addEventListener('click', () => toggleModal(popupNewCard));

popupEditCloseButton.addEventListener('click', popupEditToggle);
popupNewCardCloseButton.addEventListener('click', () => toggleModal(popupNewCard));
popupImageCloseButton.addEventListener('click', () => toggleModal(popupImage));

popupEditContainer.addEventListener('submit', formEditSubmitHandler);
popupNewCardContainer.addEventListener('submit', formNewCardSubmitHandler);

initialCards.forEach(function(item) {
    const card = new Card(item, '#place', handlePreviewPicture);
    const cardElement = card.renderCard();
    insertNewCard(cardElement);
});

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((item) => {
    const validator = new FormValidator(validationConfig, item);
    validator.enableValidation();
    item.validator = validator;
});

//Закрытие модального окна кликом по popup
popup.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            toggleModal(evt.target);
        }
    });
});
