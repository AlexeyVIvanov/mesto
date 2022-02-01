
let openPopupButton = document.querySelector('.profile__edit-button');
let popupProfile = document.querySelector('#profile');
let closePopupButton = document.querySelector('.popup__close');

let formElementOne = document.querySelector('#form1');

let nameInput = document.querySelector('#topfield');
let professionInput = document.querySelector('#bottomfield');

let nameProfile = document.querySelector('.profile__title');
let professionProfile = document.querySelector('.profile__subtitle');

// Открытие-закрытие Попапа

openPopupButton.addEventListener('click', function () {
  popupProfile.classList.add('popup_opened')
  // Проставление данных из разметки в инпуты в момент открытия
  nameInput.value = nameProfile.textContent;
  professionInput.value = professionProfile.textContent;
});

closePopupButton.addEventListener('click', function () {
  popupProfile.classList.remove('popup_opened')
  // Сброс полей формы при закрытии
  formElementOne.reset()
});

// Обработчик «отправки» формы

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Получите значение полей jobInput и nameInput из свойства value
nameInput.textContent = nameInput.value;
professionInput.textContent = professionInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
nameProfile.textContent = nameInput.value;
professionProfile.textContent = professionInput.value;
// Закрытие Попапа после нажатия кнопки Сохранить
popupProfile.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementOne.addEventListener('submit', formSubmitHandler);

// PROJECT 5
// Карточки для загрузки страницы
const initialCards = [
  {
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

// вставляем Template на страницу (В ТРЕНАЖЕРЕ ВНУТРИ ФУНКЦИИ)
const template = document.querySelector('.cards').content;
let elementsContainer = document.querySelector('.elements');

function createCard(name, link) {
  // клонируем содержимое тега template
  let card = template.querySelector('.elements__item').cloneNode(true);
  // наполняем содержимым
  card.querySelector('.elements__title').textContent = name;
  card.querySelector('.elements__image').src = link;
  // лайки
  let buttonLike = document.querySelector('elements__like');
  card.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');

    return card;
  });

}

function render(card) {
  // отображаем на странице
  elementsContainer.append(card);
}

initialCards.forEach(function(item) {
  let cardItem = createCard(item.name, item.link);
render(cardItem);
});

// попап елементс
let openPopupButtonElements = document.querySelector('.profile__add-button');
let popupElements = document.querySelector('#elements');
let closePopupButtonElements = popupElements.querySelector('.popup__close');

let formElementTwo = document.querySelector('#form2');

let placeInput = document.querySelector('#top');
let linkInput = document.querySelector('#bottom');

let placeElements = document.querySelector('.elements__title');
let linkElements = document.querySelector('.elements__image');

// Открытие-закрытие Попапа

openPopupButtonElements.addEventListener('click', function () {
  popupElements.classList.add('popup_opened')
  // Проставление данных из разметки в инпуты в момент открытия
  placeInput.value = placeElements.textContent;
  linkInput.value = linkElements.textContent;
});

closePopupButtonElements.addEventListener('click', function () {
  popupElements.classList.remove('popup_opened')
  // Сброс полей формы при закрытии
  formElementTwo.reset()
});

// Обработчик «отправки» формы

function formCreateHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Получите значение полей linkInput и placeInput из свойства value
placeInput.textContent = placeInput.value;
linkInput.textContent = linkInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
placeElements.textContent = placeInput.value;
linkElements.textContent = linkInput.value;
// Закрытие Попапа после нажатия кнопки Сохранить
popupElements.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementTwo.addEventListener('submit', formCreateHandler);

