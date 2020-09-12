import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


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
const userAvatar = document.querySelector('.profile__avatar');

const nameInput = document.querySelector('.popup__input_type_name');
const occupationInput = document.querySelector('.popup__input_type_occupation');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
let userID = 0;
const message = document.querySelector('.popup__message');

const apiConfig = {
    userURL: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me',
    cardsURL: 'https://mesto.nomoreparties.co/v1/cohort-15/cards',
    token: 'e6bf7ea4-0157-47ee-b8f8-bf17d3b13ba1'
}

//создаем экземпляры классов
const user = new UserInfo({ nameSelector: '.profile__name', occupationSelector: '.profile__occupation' });
const imagePopup = new PopupWithImage('.popup_type_image');
const editModal = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
const newCardModal = new PopupWithForm('.popup_type_new-card', formNewCardSubmitHandler);
const confirmModal = new PopupWithForm('.popup_type_confirm', formConfirmSubmitHandler);
const avatarModal = new PopupWithForm('.popup_type_avatar', formAvatarSubmitHandler);
const api = new Api(apiConfig);

//навешиваем слушатели
imagePopup.setEventListeners();
editModal.setEventListeners();
newCardModal.setEventListeners();
confirmModal.setEventListeners();
avatarModal.setEventListeners();

//обработчик обновления аватара
function formAvatarSubmitHandler(data) {
    avatarModal._submitButton.textContent = 'Сохранение...';
    console.log(data);
    api.avatarUpload(data)
        .then((res) => {
            userAvatar.src = data.link;
            avatarModal._submitButton.textContent = 'Сохранить';
        })
        .catch(err => {
            showErrorMessage(err);
            console.log(err);
        })
    this.close();
}
//обработчик удаления карточки - открыть попап подтверждения
function deleteCardHandler(id, evt) {
    confirmModal.cardToDeleteID = id;
    confirmModal.cardToDeleteElement = evt.target.parentElement;
    confirmModal.open();
}
//обработчик подтверждения - удаление карточки
function formConfirmSubmitHandler() {
    api.deleteCard(confirmModal.cardToDeleteID)
        .catch(err => {
            showErrorMessage(err);
            console.log(err);
        });
    confirmModal.cardToDeleteElement.remove();
    this.close();

}

//обработчик лайка карточки
function likeHandler(id, evt) {
    if (evt.target.classList.contains('card__like-button_pressed')) {
        api.dislikeCard(id)
            .then((res) => {
                evt.target.nextElementSibling.textContent = res.likes.length;
                evt.target.classList.remove('card__like-button_pressed');
            })
            .catch((err) => {
                showErrorMessage(err);
                console.log(err);
            })
    } else {
        api.likeCard(id)
            .then((res) => {
                evt.target.nextElementSibling.textContent = res.likes.length;
                evt.target.classList.add('card__like-button_pressed');
            })
            .catch((err) => {
                showErrorMessage(err);
                console.log(err);
            })
    }
}

//загрузка профиля пользователя с сервера
const userFromServer = api.userDownload();
userFromServer
    .then((data) => {
        user.setUserInfo({ "name": data.name, "occupation": data.about });
        userAvatar.src = data.avatar;
        userID = data._id;
    })
    .catch((err) => {
        showErrorMessage(err);
        console.log(err);
    })




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
    editModal._submitButton.textContent = 'Сохранение...'
    api.profileDataUpload(data.name, data.occupation)
        .then((res) => {
            console.log('загрузилось ок');
        })
        .catch((err) => {
            showErrorMessage(err);
            console.log(err);
        })
    editModal._submitButton.textContent = 'Сохранить'
    this.close();
}

function formNewCardSubmitHandler(data) {
    newCardModal._submitButton.textContent = 'Сохранение...'
    const card = new Card({
            name: data.place,
            link: data.link,
            owner: { _id: userID },
            likes: []
        },
        '#place',
        userID,
        handlePreviewPicture,
        deleteCardHandler,
        likeHandler);
    const cardElement = card.renderCard();
    cardsGrid.insertItem(cardElement);
    api.newCardUpload(data.place, data.link)
        .then((res) => {
            newCardModal._submitButton.textContent = 'Сохранить'
        })
        .catch((err) => {
            showErrorMessage(err);
            console.log(err);
        })
    placeInput.value = '';
    linkInput.value = '';
    this.close();
}

//создание первоначальной сетки с карточками
let cardsGrid = {};
const cardsFromServer = api.cardsDownload();
cardsFromServer
    .then((data) => {
        cardsGrid = new Section({
            items: data,
            renderer: (item) => {
                const card = new Card(item, '#place', userID, handlePreviewPicture, deleteCardHandler, likeHandler);
                const cardElement = card.renderCard();
                cardsGrid.insertItem(cardElement);
            }
        }, '.cards');
        cardsGrid.renderItems();
    })

.catch((err) => {
    showErrorMessage(err);
    console.log(err);
})

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
userAvatar.addEventListener('click', () => { avatarModal.open() });

//функция показа ошибки связи с сервером
function showErrorMessage(text) {
    message.textContent = text;
    message.parentElement.classList.add('popup_opened');
    setTimeout(() => {
        message.textContent = '';
    }, 2000);
    setTimeout(() => {
        message.parentElement.classList.remove('popup_opened');
    }, 2200);

}