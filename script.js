const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

let nameInput = document.querySelector('input[name="name"]');
let occupationInput = document.querySelector('input[name="occupation"]');

/* Если отказаться от модификатора popup__closed, прописать display:none; непосредственно в
.popup{...}, и при этом импортировать стили модификатора popup__closed в popup, то свойство
display модификатора не будет срабатывать. И, чтобы не возникало конфликта, я вынес display
в модификаторы (то есть модификатор НЕ ИЗМЕНЯЕТ, а ДОБАВЛЯЕТ свойства блока). Этот вариант
для решения подобных конфликтов объяснялся наставниками.
Еще можно импортировать все стили (и блока и его модификаторов и его элементов, и его модификаторов)
сразу в index.css, но тогда нужно переписать все импорты всех блоков, элементов, модификаторов
 для единообразия проекта. На эту тему была дискуссия в Slack. И вроде бы пришли к мнению,
 что прописывать все-все импорты в index.css - это норм. Я так и делал на первых спринтах.
 Чтобы оставить структуру построения импортов как есть, предлагаю включать и выключать popup
 методом setAttribute. Напишите, пожалуйста, почему использовать 2 модификатора для решения
 этой проблемы нельзя? Заранее спасибо!*/

function popupOpen() {
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    popup.style.display = 'block';
}

function popupClose() {

    popup.style.display = 'none';

}

function formSubmitHandler(evt) {
    evt.preventDefault();
}

function writeData() {
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    popupClose();
}
editButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
popupContainer.addEventListener('submit', writeData);
popupContainer.addEventListener('submit', formSubmitHandler);
