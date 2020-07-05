const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

let nameInput = document.querySelector('input[name="name"]');
let occupationInput = document.querySelector('input[name="occupation"]');

function popupToggle() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    } else {
        nameInput.value = profileName.textContent;
        occupationInput.value = profileOccupation.textContent;
        popup.classList.add('popup_opened');
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    popupToggle();
}

editButton.addEventListener('click', popupToggle);
closePopupButton.addEventListener('click', popupToggle);
popupContainer.addEventListener('submit', formSubmitHandler);
