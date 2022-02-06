
const openEditFormButton = document.querySelector('.profile__edit-button');
const popupEditProfileForm = document.querySelector('.popup_type_edit-profile');
const closeEditFormButton = document.querySelector('.popup__close-popup-edit-form');

const formEditProfile = document.querySelector('.popup__form-edit-profile');

const inputNameOfEditForm = document.querySelector('.popup__input-name');
const inputProfessionOfEditForm = document.querySelector('.popup__input-profession');

const textOfTitleInProfile = document.querySelector('.profile__title');
const textOfSubtitleInProfile = document.querySelector('.profile__subtitle');

// Открытие-закрытие Попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openPopupProfile () {
  inputNameOfEditForm.value = textOfTitleInProfile.textContent;
  inputProfessionOfEditForm.value = textOfSubtitleInProfile.textContent;
  openPopup (popupEditProfileForm);
}

openEditFormButton.addEventListener('click', openPopupProfile);


closeEditFormButton.addEventListener('click', () => {closePopup (popupEditProfileForm)});

// Обработчик «отправки» формы

function submitHandlerFormEditProfile (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.


    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
textOfTitleInProfile.textContent = inputNameOfEditForm.value;
textOfSubtitleInProfile.textContent = inputProfessionOfEditForm.value;
// Закрытие Попапа после нажатия кнопки Сохранить
closePopup (popupEditProfileForm);
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
    const cardOfPopupPicture = popupPicture.querySelector('.popup__image');
    cardOfPopupPicture.src = link;
    cardOfPopupPicture.alt = name;
    document.querySelector('.popup__caption').textContent = name;
    // открытие попапа picture
    openPopup (popupPicture);

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
const popupAddCardForm = document.querySelector('.popup_type_add-card');
const closeAddCardFormButton = popupAddCardForm.querySelector('.popup__close-popup-add-form');

const formAddCard = document.querySelector('.popup__form-add-card');

const inputNameOfPlaceOfAddForm = document.querySelector('.popup__input-place');
const inputLinkOfAddForm = document.querySelector('.popup__input-link');

const captionOfCard = document.querySelector('.elements__title');
const imageOfCard = document.querySelector('.elements__image');

// попап Picture
const popupPicture = document.querySelector('.popup_type_picture');
const closePopupPictureButton = popupPicture.querySelector('.popup__close-popup-picture');

// закрытие попапа picture
closePopupPictureButton.addEventListener('click', () => {closePopup (popupPicture)});


// Открытие-закрытие Попапа елементс
openFormAddCardButton.addEventListener('click', () => {openPopup (popupAddCardForm)});

closeAddCardFormButton.addEventListener('click', () => {closePopup (popupAddCardForm)
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
closePopup (popupAddCardForm);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddCard.addEventListener('submit', submitHandlerFormAddCard);

