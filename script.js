const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupSubtitle = imagePopup.querySelector('.image-popup__subtitle');

const cards = document.querySelector('.cards');
const cardLikeButton = document.querySelector('.card__like-button'); //здесь

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

let nameInput = document.querySelector('input[name="name"]');
let occupationInput = document.querySelector('input[name="occupation"]');
let popupType = 'edit';
const transitionTime = 1000;

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
    newCard.querySelector('.card__image').src = link;
    newCard.querySelector('.card__image').alt = name;
    newCard.querySelector('.card__title').textContent = name;
    cards.prepend(newCard);

}

initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});


function popupToggle() {

    if (popupType === 'edit') {
        if (popup.classList.contains('popup_opened')) {
            popup.classList.remove('popup_opened');
        } else {
            nameInput.removeAttribute('placeholder');
            occupationInput.removeAttribute('placeholder');
            popup.querySelector('.popup__text').textContent = 'Редакторовать профиль';
            nameInput.value = profileName.textContent;
            occupationInput.value = profileOccupation.textContent;
            popup.classList.add('popup_opened');
        }
    } else if (popupType === 'new') {
        if (popup.classList.contains('popup_opened')) {
            popup.classList.remove('popup_opened');
        } else {
            popup.querySelector('.popup__text').textContent = 'Новое место';
            nameInput.value = '';
            occupationInput.value = '';
            nameInput.setAttribute('placeholder', 'название');
            occupationInput.setAttribute('placeholder', 'ссылка на картинку');
            popup.classList.add('popup_opened');
        }
    }
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    if (popupType === 'edit') {
        profileName.textContent = nameInput.value;
        profileOccupation.textContent = occupationInput.value;
    } else if (popupType === 'new') {
        addCard(nameInput.value, occupationInput.value);

    }
    popupToggle(popupType);
}

function makeDark() {
    const clickedItem = event.target;
    clickedItem.classList.add('card__like-button_pressed');
}

function deleteCard() {
    const clickedItem = event.target;
    clickedItem.parentElement.remove();
}

function showImagePopup() {
    const clickedItem = event.target;
    imagePopupImage.setAttribute('src', '' + clickedItem.getAttribute("src"));
    imagePopupSubtitle.textContent = clickedItem.getAttribute("alt");
    imagePopup.classList.add('image-popup_opened');
    setTimeout(() => { imagePopup.classList.add('image-popup_arised'); }, 1);
}

function closeImagePopup() {
    imagePopup.classList.remove('image-popup_arised');
    setTimeout(() => { imagePopup.classList.remove('image-popup_opened'); }, transitionTime);
}



editButton.addEventListener('click', () => {
    popupType = 'edit';
    popupToggle();

});
addButton.addEventListener('click', () => {
    popupType = 'new';
    popupToggle();

});



closePopupButton.addEventListener('click', popupToggle);

popupContainer.addEventListener('submit', formSubmitHandler);