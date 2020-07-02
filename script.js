const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');

editButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
saveButton.addEventListener('click', writeData);

function popupOpen() {
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

let inputs = document.querySelectorAll('.popup__input');

function writeData() {
    profileName.textContent = `${inputs[0].value}`;
    profileOccupation.textContent = `${inputs[1].value}`;
    popupClose();
}