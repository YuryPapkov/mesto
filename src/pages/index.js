import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


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
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditContainer = popupEdit.querySelector('.popup__container');

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
//создаем экземпляры классов
const user = new UserInfo({ nameSelector: '.profile__name', occupationSelector: '.profile__occupation' });
const imagePopup = new PopupWithImage('.popup_type_image');
const editModal = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
const newCardModal = new PopupWithForm('.popup_type_new-card', formNewCardSubmitHandler);

//навешиваем слушатели
imagePopup.setEventListeners();
editModal.setEventListeners();
newCardModal.setEventListeners();


//функции открытия модальных окон
function handlePreviewPicture(name, link) {
    imagePopup.open(name, link);
}

function openEditModal() {
    editModal.open();
    const userData = user.getUserInfo();
    nameInput.value = userData.name;
    occupationInput.value = userData.occupation;
    setTimeout(function() {
        popupEditContainer.querySelector('.popup__input').focus();
    }, 100);
}

//функции - обработчики сабмитов
function formEditSubmitHandler(data) {
    user.setUserInfo(data);
    this.close();
}

function formNewCardSubmitHandler(data) {
    const card = new Card({ name: data.place, link: data.link }, '#place', handlePreviewPicture);
    const cardElement = card.renderCard();
    cardsGrid.insertItem(cardElement);
    placeInput.value = '';
    linkInput.value = '';
    this.close();
}

//создание первоначальной сетки с карточками
const cardsGrid = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#place', handlePreviewPicture);
        const cardElement = card.renderCard();
        cardsGrid.insertItem(cardElement);
    }
}, '.cards');
cardsGrid.renderItems();

//создание экземпляров класса FormValidator на каждой форме и привязка к форме
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((item) => {
    const validator = new FormValidator(validationConfig, item);
    validator.enableValidation();
    item.validator = validator;
});

//установка слушателей на кнопки редактирования профиля и добавления карточки
editButton.addEventListener('click', openEditModal);
addButton.addEventListener('click', () => { newCardModal.open() });
