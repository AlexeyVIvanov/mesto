const openEditFormButton = document.querySelector('.profile__edit-button');
const popupEditProfileForm = document.querySelector('.popup__edit-profile');
const closeEditFormButton = document.querySelector('.popup__close-popup-edit-form');

const formEditProfile = document.querySelector('.popup__form-edit-profile');

const inputNameOfEditForm = document.querySelector('.popup__input-name');
const inputProfessionOfEditForm = document.querySelector('.popup__input-profession');

const textOfTitleInProfile = document.querySelector('.profile__title');
const textOfSubtitleInProfile = document.querySelector('.profile__subtitle');

// Открытие-закрытие Попапа

openEditFormButton.addEventListener('click', function () {
  popupEditProfileForm.classList.add('popup_opened')
  // Проставление данных из разметки в инпуты в момент открытия
  inputNameOfEditForm.value = textOfTitleInProfile.textContent;
  inputProfessionOfEditForm.value = textOfSubtitleInProfile.textContent;
});

closeEditFormButton.addEventListener('click', function () {
  popupEditProfileForm.classList.remove('popup_opened')
  // Сброс полей формы при закрытии

});

// Обработчик «отправки» формы

function submitHandlerFormEditProfile (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.


    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
textOfTitleInProfile.textContent = inputNameOfEditForm.value;
textOfSubtitleInProfile.textContent = inputProfessionOfEditForm.value;
// Закрытие Попапа после нажатия кнопки Сохранить
popupEditProfileForm.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', submitHandlerFormEditProfile);

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
const containerForCards = document.querySelector('.elements');

// создаем карточки
function createCard(name, link) {
  // клонируем содержимое тега template
  const card = template.querySelector('.elements__item').cloneNode(true);
  // наполняем содержимым
  card.querySelector('.elements__title').textContent = name;
  const cardImage = card.querySelector('.elements__image');
  cardImage.src = link;
  cardImage.alt = name;

  // лайки
  card.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');

  });

  // корзина
  card.querySelector('.elements__trash').addEventListener('click', function (evt) {
    evt.target.closest('.elements__item').remove();

  });

  // картинка
  cardImage.addEventListener('click', function () {
    document.querySelector('.popup__image').src = link;
    document.querySelector('.popup__caption').textContent = name;
    // открытие попапа picture
    document.querySelector('.popup__picture').classList.add('popup_opened');

  });

  return card;
}

function render(card) {
  // отображаем на странице карточки
  containerForCards.prepend(card);

}

// перебираем массив
const initialCardsRevers = initialCards.reverse();
initialCardsRevers.forEach(function(item) {
const cardItem = createCard(item.name, item.link);

render(cardItem);

});


// попап елементс
const openFormAddCardButton = document.querySelector('.profile__add-button');
const popupAddCardForm = document.querySelector('.popup__add-card');
const closeAddCardFormButton = popupAddCardForm.querySelector('.popup__close-popup-add-form');

const formAddCard = document.querySelector('.popup__form-add-card');

const inputNameOfPlaceOfAddForm = document.querySelector('.popup__input-place');
const inputLinkOfAddForm = document.querySelector('.popup__input-link');

const captionOfCard = document.querySelector('.elements__title');
const imageOfCard = document.querySelector('.elements__image');

// попап Picture
const popupPicture = document.querySelector('.popup__picture');
const closePopupPictureButton = popupPicture.querySelector('.popup__close-popup-picture');

// закрытие попапа picture
closePopupPictureButton.addEventListener('click', function () {
  popupPicture.classList.remove('popup_opened')

});


// Открытие-закрытие Попапа елементс
openFormAddCardButton.addEventListener('click', function () {
  popupAddCardForm.classList.add('popup_opened')
  // Проставление данных из разметки в инпуты в момент открытия
  //inputNameOfPlaceOfAddForm.value = captionOfCard.textContent;
  //inputLinkOfAddForm.value = imageOfCard.src;
});

closeAddCardFormButton.addEventListener('click', function () {
  popupAddCardForm.classList.remove('popup_opened')
  // Сброс полей формы при закрытии
  formAddCard.reset()
});


// Обработчик «отправки» формы

function submitHandlerFormAddCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const cardItem = createCard(inputNameOfPlaceOfAddForm.value, inputLinkOfAddForm.value);

//Добавляешь на страницу
  render(cardItem);

  formAddCard.reset()
// Закрытие Попапа после нажатия кнопки Сохранить
  popupAddCardForm.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddCard.addEventListener('submit', submitHandlerFormAddCard);

