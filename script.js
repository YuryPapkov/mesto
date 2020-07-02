let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let popup = document.querySelector('.popup');

editButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
saveButton.addEventListener('click', writeData);


function popupOpen() {
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

let inputs = document.querySelectorAll('.popup__input');




function writeData() {
    profileName.textContent = `${inputs[0].value}`;
    profileOccupation.textContent = `${inputs[1].value}`;
    popupClose();
}