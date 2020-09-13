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
let userData = {};
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

let cardsGrid = {};
const userFromServer = api.userDownload();
const cardsFromServer = api.cardsDownload();

const dataDownload = [userFromServer, cardsFromServer];
Promise.all(dataDownload)
    .then((data) => {
        userData = data[0];
        const cardsData = data[1];
        user.setUserInfo({ "name": userData.name, "occupation": userData.about });
        userAvatar.src = userData.avatar;
        cardsGrid = new Section({
            items: cardsData,
            renderer: (item) => {
                const card = new Card(item, '#place', userData._id, handlePreviewPicture, deleteCardHandler, likeHandler);
                const cardElement = card.renderCard();
                cardsGrid.insertItem(cardElement);
            }
        }, '.cards');
        cardsGrid.renderItems();



        //установка слушателей на модальные окна
        imagePopup.setEventListeners();
        editModal.setEventListeners();
        newCardModal.setEventListeners();
        confirmModal.setEventListeners();
        avatarModal.setEventListeners();

        //создание экземпляров класса FormValidator на каждой форме и привязка к форме
        const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
        formList.forEach((item) => {
            const validator = new FormValidator(validationConfig, item);
            validator.enableValidation();
            item.validator = validator;
        });
        //установка слушателей на кнопки редактирования профиля и добавления карточки
        editButton.addEventListener('click', openEditModal);
        addButton.addEventListener('click', () => {
            console.log(newCardModal);
            newCardModal._submitButton.disabled = true;
            newCardModal._submitButton.classList.add('popup__save-button_disabled');
            newCardModal.open()
        });
        userAvatar.addEventListener('click', () => {
            avatarModal._submitButton.disabled = true;
            avatarModal._submitButton.classList.add('popup__save-button_disabled');
            avatarModal.open()
        });
    })
    .catch((err) => {
        showErrorMessage(err);
        console.log(err);
    });

//обработчик обновления аватара
function formAvatarSubmitHandler(data) {
    avatarModal._submitButton.textContent = 'Сохранение...';
    console.log(data);
    api.avatarUpload(data)
        .then((res) => {
            console.log(res);
            userAvatar.src = res.avatar;
            this.close();
        })
        .catch(err => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            avatarModal._submitButton.textContent = 'Сохранить';
        })

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
        .then(res => {
            console.log(res);
            confirmModal.cardToDeleteElement.remove();
            this.close();
        })
        .catch(err => {
            showErrorMessage(err);
            console.log(err);
        });

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
    editModal._submitButton.textContent = 'Сохранение...'
    api.profileDataUpload(data.name, data.occupation)
        .then((res) => {
            console.log(res);
            user.setUserInfo({ name: res.name, occupation: res.about });
            this.close();
        })
        .catch((err) => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            editModal._submitButton.textContent = 'Сохранить'
        })
}

function formNewCardSubmitHandler(data) {
    newCardModal._submitButton.textContent = 'Сохранение...'
    api.newCardUpload(data.place, data.link)
        .then((res) => {
            console.log(res);
            const card = new Card({
                    name: res.name,
                    link: res.link,
                    owner: res.owner,
                    likes: res.likes,
                    _id: res._id
                },
                '#place',
                userData._id,
                handlePreviewPicture,
                deleteCardHandler,
                likeHandler);
            const cardElement = card.renderCard();
            cardsGrid.insertItemToTheTop(cardElement);
            this.close();
        })
        .catch((err) => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            newCardModal._submitButton.textContent = 'Сохранить';
        })
    placeInput.value = '';
    linkInput.value = '';
}

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
