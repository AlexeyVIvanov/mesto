import {FormValidator} from '../components/FormValidator.js';

import {Card} from '../components/Card.js';

import {Section} from '../components/Section.js';

import {PopupWithImage} from '../components/PopupWithImage.js';

import {PopupWithForm} from '../components/PopupWithForm.js';

import {UserInfo} from '../components/UserInfo.js';

import {
  openEditFormButton,
  formEditProfile,
  inputNameOfEditForm,
  inputProfessionOfEditForm,
  openFormAddCardButton,
  formAddCard,
  buttonSubmitFormAddCard,
  initialCardsRevers,
  validationConfig
} from '../utils/constants.js';


// валидация
const formEditProfileValidate = new FormValidator(validationConfig, formEditProfile);
const formAddCardValidate = new FormValidator(validationConfig, formAddCard);

formEditProfileValidate.enableValidation();
formAddCardValidate.enableValidation();

//  userInfo
const userInfo = new UserInfo({
  userNameInfoSelector: '.profile__title',
  userJobInfoSelector: '.profile__subtitle'
});

// форма edit profile
const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitHandlerForm: (valuesInput) => {
    userInfo.setUserInfo(valuesInput.name, valuesInput.profession);

  }

});


openEditFormButton.addEventListener('click', () => {
  const {name, job} = userInfo.getUserInfo();
  popupWithFormEditProfile.open();

  inputNameOfEditForm.value = name;
  inputProfessionOfEditForm.value = job;

  formEditProfileValidate.resetErrors();
  formEditProfileValidate.toggleButtonState();
});

popupWithFormEditProfile.setEventListeners();

// форма add-card
const popupWithFormAddCard = new PopupWithForm('.popup_type_add-card', {
  submitHandlerForm: (valuesInput) => {

    const cardItem = createCard({
      name: valuesInput.place,
      link: valuesInput.link
    });

    cardsList.addItem(cardItem);

  }

});

openFormAddCardButton.addEventListener('click', () => {
  buttonSubmitFormAddCard.setAttribute('disabled', true);
  buttonSubmitFormAddCard.classList.add('popup__submit_disabled');
  popupWithFormAddCard.open();

});

popupWithFormAddCard.setEventListeners();

// popup picture
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
  data: initialCardsRevers,
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardsList.addItem(card);

  },
},
    '.elements'
);

cardsList.renderItems();
