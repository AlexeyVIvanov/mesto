import './index.css';

import {FormValidator} from '../components/FormValidator.js';

import {Card} from '../components/Card.js';

import {Section} from '../components/Section.js';

import {PopupWithImage} from '../components/PopupWithImage.js';

import {PopupWithForm} from '../components/PopupWithForm.js';

import {UserInfo} from '../components/UserInfo.js';

import {api} from '../components/Api.js'

import {
  openEditFormButton,
  openUpdateAvatarForm,
  formEditProfile,
  inputNameOfEditForm,
  inputProfessionOfEditForm,
  openFormAddCardButton,
  formAddCard,
  buttonSubmitFormAddCard,
  formUpdateAvatar,
  validationConfig
} from '../utils/constants.js';

let userId;

api.getProfile()
  .then(res => {

    userInfo.setUserInfo(res.name, res.about, res.avatar);

    userId = res._id;
  })

api.getInitialCards()
  .then(listOfCards => {

    listOfCards.forEach(data => {

    const cardItem = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      userId: userId,
      ownerId: data.owner._id,
      id: data._id
    });

    cardsList.addItem(cardItem)
  })
})


// валидация
const formEditProfileValidate = new FormValidator(validationConfig, formEditProfile);
const formAddCardValidate = new FormValidator(validationConfig, formAddCard);
const formUpdateAvatarValidate = new FormValidator(validationConfig, formUpdateAvatar);

formEditProfileValidate.enableValidation();
formAddCardValidate.enableValidation();
formUpdateAvatarValidate.enableValidation();

//  userInfo
const userInfo = new UserInfo({
  userNameInfoSelector: '.profile__title',
  userJobInfoSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

// форма edit profile
const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitHandlerForm: (valuesInput) => {

    api.editProfile(valuesInput.name, valuesInput.profession)
      .then(res => {

        userInfo.setUserInfo(res.name, res.about, res.avatar);
      })
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

    api.addCard(valuesInput.place, valuesInput.link)
      .then(res => {

        const cardItem = createCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          userId: userId,
          ownerId: res.owner._id,
          id: res._id
        });
        cardsList.addItem(cardItem);
      })

  }

});

openFormAddCardButton.addEventListener('click', () => {
  formAddCardValidate.toggleButtonState();
  popupWithFormAddCard.open();

});

popupWithFormAddCard.setEventListeners();

// popup picture
const popupWithImage = new PopupWithImage('.popup_type_picture');

//открытие попапа picture
function openPopupPicture(name, link) {

  popupWithImage.open(name, link);
}

popupWithImage.setEventListeners();

function createCard(data) {
  // Создадим экземпляр карточки
  const card = new Card(
    data,
    '.cards',
    openPopupPicture,
    (id) => {

      cardConfirmDelete.open();
      cardConfirmDelete.changeSubmitHandler(() => {
        api.deleteConfirmCard(id)
        .then(res => {
          card.handleDeleteCard()
          cardConfirmDelete.close()
        })
      })

    },
    (id) => {

      if(card.isLiked()) {

        api.deleteLikes(id)
        .then(res => {
        card.setLikes(res.likes)
      })

      } else {
          api.addLikes(id)
          .then(res => {
          card.setLikes(res.likes)
          })
      }

    })

  // Создаём карточку и возвращаем наружу
  const cardItem = card.generateCard();

  return cardItem;
}

// создаем Section
const cardsList = new Section({
  data: [],
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardsList.addItem(card);

  },
},
    '.elements'
);

cardsList.renderItems();

const cardConfirmDelete = new PopupWithForm('.popup_type_delete-confirm', {
  submitHandlerForm: () => {
  api.deleteConfirmCard(id)
  }
});

cardConfirmDelete.setEventListeners();

const updateUserAvatar = new PopupWithForm('.popup_type_update-avatar', {
  submitHandlerForm: (valuesInput) => {
    api.updateAvatar(valuesInput.avatar)
      .then(res => {

        userInfo.setUserInfo(res.name, res.about, res.avatar);

      })
  }
});

updateUserAvatar.setEventListeners();

openUpdateAvatarForm.addEventListener('click', () => {
  updateUserAvatar.open();
  formUpdateAvatarValidate.toggleButtonState();

})


