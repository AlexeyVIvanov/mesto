import {FormValidator} from './FormValidator.js';

import {Card} from './Card.js';

import {initialCards} from './initial.js';

const openEditFormButton = document.querySelector('.profile__edit-button');
const popupEditProfileForm = document.querySelector('.popup_type_edit-profile');
const closeEditFormButton = document.querySelector('.popup__close-popup-edit-form');

const formEditProfile = document.forms.form1;

const inputNameOfEditForm = formEditProfile.elements.name;
const inputProfessionOfEditForm = formEditProfile.elements.profession;

const textOfTitleInProfile = document.querySelector('.profile__title');
const textOfSubtitleInProfile = document.querySelector('.profile__subtitle');

// вставляем Template на страницу
const containerForCards = document.querySelector('.elements');
const containerForCaptionAndLike = document.querySelector('.popup__caption');

// попап елементс
const openFormAddCardButton = document.querySelector('.profile__add-button');
const popupAddCardForm = document.querySelector('.popup_type_add-card');
const closeAddCardFormButton = popupAddCardForm.querySelector('.popup__close-popup-add-form');

const formAddCard = document.forms.form2;

const inputNameOfPlaceOfAddForm = formAddCard.elements.place;
const inputLinkOfAddForm = formAddCard.elements.link;

const buttonSubmitFormAddCard = formAddCard.querySelector('.popup__submit-add-card');

// попап Picture
const popupPicture = document.querySelector('.popup_type_picture');
const closePopupPictureButton = popupPicture.querySelector('.popup__close-popup-picture');
const cardOfPopupPicture = popupPicture.querySelector('.popup__image');

// валидация
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formEditProfileValidate = new FormValidator(validationConfig, formEditProfile);
const formAddCardValidate = new FormValidator(validationConfig, formAddCard);

formEditProfileValidate.enableValidation();
formAddCardValidate.enableValidation();


// закрытие попапа нажатием на оверлей
function closePopupClickOverlay (evt) {
  if (evt.target === document.querySelector('.popup_opened')) {
    closePopup (evt.target);
  }
}

// закрытие попапа нажатием на Escape
function closePopupKeyEscape(evt) {
    if (evt.key === "Escape") {
      closePopup (document.querySelector('.popup_opened'));
    }
}

// Открытие-закрытие Попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupClickOverlay);
  document.addEventListener('keyup', closePopupKeyEscape);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupClickOverlay);
  document.removeEventListener('keyup', closePopupKeyEscape);
}

function openPopupProfile () {
  inputNameOfEditForm.value = textOfTitleInProfile.textContent;
  inputProfessionOfEditForm.value = textOfSubtitleInProfile.textContent;
  openPopup (popupEditProfileForm);
  formEditProfileValidate.resetErrors();
  formEditProfileValidate.toggleButtonState();
}

openEditFormButton.addEventListener('click', openPopupProfile);

closeEditFormButton.addEventListener('click', () => {closePopup (popupEditProfileForm)});

// Обработчик «отправки» формы
function submitHandlerFormEditProfile (evt) {
    evt.preventDefault();
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

//открытие попапа picture
function openPopupPicture() {
  cardOfPopupPicture.src = this._link;
  cardOfPopupPicture.alt = this._name;
  containerForCaptionAndLike.textContent = this._name;
  // открытие попапа picture
  openPopup (popupPicture);
}

// закрытие попапа picture
closePopupPictureButton.addEventListener('click', () => {closePopup (popupPicture)});

function render(card) {
  // отображаем на странице карточки
  containerForCards.prepend(card);
}

function createCard(data) {
  // Создадим экземпляр карточки
  const card = new Card(data, '.cards', openPopupPicture);
  // Создаём карточку и возвращаем наружу
  const cardItem = card.generateCard();

  return cardItem;
}

// перебираем массив
const initialCardsRevers = initialCards.reverse();
initialCardsRevers.forEach(function(data) {
  const cardItem = createCard(data);
  render(cardItem);
});

// функция деактивирования кнопки сабмита при открытии попапа
function openformAddCard () {
  buttonSubmitFormAddCard.setAttribute('disabled', true);
  buttonSubmitFormAddCard.classList.add('popup__submit_disabled');
  openPopup(popupAddCardForm);
}

// Открытие-закрытие Попапа елементс
openFormAddCardButton.addEventListener('click', () => {openformAddCard (popupAddCardForm)});

closeAddCardFormButton.addEventListener('click', () => {closePopup (popupAddCardForm)
  // Сброс полей формы при закрытии
  formAddCard.reset()
});

// Обработчик «отправки» формы
function submitHandlerFormAddCard (evt) {
  evt.preventDefault();
  //Добавляем на страницу
  const cardItem = createCard({
    name: inputNameOfPlaceOfAddForm.value,
    link: inputLinkOfAddForm.value
  });
  render(cardItem);
  formAddCard.reset();

// Закрытие Попапа после нажатия кнопки Сохранить
  closePopup (popupAddCardForm);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddCard.addEventListener('submit', submitHandlerFormAddCard);
