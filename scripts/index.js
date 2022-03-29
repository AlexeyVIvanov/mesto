import {FormValidator} from './FormValidator.js';

import {Card} from './Card.js';

import {initialCards} from './initial.js';

import {Section} from './Section.js';

import {Popup} from './Popup.js';

import {PopupWithImage} from './PopupWithImage.js';

import {PopupWithForm} from './PopupWithForm.js';

import {UserInfo} from './UserInfo.js';

export const openEditFormButton = document.querySelector('.profile__edit-button');
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
export const openFormAddCardButton = document.querySelector('.profile__add-button');
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


// Обработчик «отправки» формы
function submitHandlerFormEditProfile (data) {
  const {name, description} = data;
  console.log('data', data)
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
//textOfTitleInProfile.textContent = inputNameOfEditForm.value;
//textOfSubtitleInProfile.textContent = inputProfessionOfEditForm.value;
userInfo.setUserInfo(name, description);
// Закрытие Попапа после нажатия кнопки Сохранить
popupWithFormEditProfile.close();
}


// форма edit profile
const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit-profile', () => {
  submitHandlerFormEditProfile
// {
//  submitHandlerForm: (valuesInput) => {

//  this._getInputValues();

//  const profileNew = [
//    {
//      name: inputNameOfEditForm.value,
//      link: inputProfessionOfEditForm.value
//    }
//  ];
//  cardsList.addItem(createCard(cardItem));
//  }
//}
});


openEditFormButton.addEventListener('click', () => {
  const {name, job} = userInfo.getUserInfo();
  popupWithFormEditProfile.open();

  inputNameOfEditForm.value = name;
  inputProfessionOfEditForm.value = job;

  popupWithFormEditProfile.setEventListeners();

  formEditProfileValidate.resetErrors();
  formEditProfileValidate.toggleButtonState();
});



// форма add-card
const popupWithFormAddCard = new PopupWithForm('.popup_type_add-card', () => {
  submitHandlerFormAddCard
//{
//  submitHandlerForm: (valuesInput) => {

//  this._getInputValues();

//  const profileNew = [
//    {
//      name: inputNameOfEditForm.value,
 //     link: inputProfessionOfEditForm.value
//    }
 // ];
 // cardsList.addItem(createCard(cardItem));
 // }
//}
});


openFormAddCardButton.addEventListener('click', () => {
  popupWithFormAddCard.open();
  popupWithFormAddCard.setEventListeners();
});

// PROJECT 5

const popupWithImage = new PopupWithImage('.popup_type_picture');


//открытие попапа picture
function openPopupPicture(name, link) {

  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}


function createCard(data) {
  // Создадим экземпляр карточки
  const card = new Card(data, '.cards', openPopupPicture);

  // Создаём карточку и возвращаем наружу
  const cardItem = card.generateCard();

  return cardItem;
}

// создаем Section
const cardsList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardsList.addItem(card);

  },
},
    '.elements'
);

cardsList.renderItems();

// функция деактивирования кнопки сабмита при открытии попапа
//function openformAddCard () {
//  buttonSubmitFormAddCard.setAttribute('disabled', true);
//  buttonSubmitFormAddCard.classList.add('popup__submit_disabled');
//  openPopup(popupAddCardForm);
//}



// Обработчик «отправки» формы
const submitHandlerFormAddCard = (data) => {
  console.log('data', data)
  //evt.preventDefault();
  //Добавляем на страницу
  const cardItem = createCard(data
    //{
    //name: inputNameOfPlaceOfAddForm.value,
    //link: inputLinkOfAddForm.value
  //}
  );
  //render(cardItem);
  cardsList.addItem(cardItem);
  //formAddCard.reset();

// Закрытие Попапа после нажатия кнопки Сохранить
  popupWithFormAddCard.close();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
//formAddCard.addEventListener('submit', submitHandlerFormAddCard);

const userInfo = new UserInfo({
  userNameInfoSelector: '.profile__title',
  userJobInfoSelector: '.profile__subtitle'
});
