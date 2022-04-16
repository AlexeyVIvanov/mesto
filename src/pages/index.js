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
  formUpdateAvatar,
  validationConfig
} from '../utils/constants.js';


let userId;

Promise.all ([
  api.getProfile(),
  api.getInitialCards()
])
  .then((res) => {

    userInfo.setUserInfo(res[0].name, res[0].about, res[0].avatar);

    userId = res[0]._id;

    cardsList.renderItems(
      { data: res[1],
        renderer: (res) => {
          const cardItem = createCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          userId: userId,
          ownerId: res.owner._id,
          id: res._id
        });
        cardsList.addItem(cardItem);
        }
      }
    )
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


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
    popupWithFormEditProfile.changeTextOfButton('Сохранение...')

    api.editProfile(valuesInput.name, valuesInput.profession)
      .then(res => {

        userInfo.setUserInfo(res.name, res.about, res.avatar);
      })
      .then(() => {
        popupWithFormEditProfile.close()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupWithFormEditProfile.changeTextOfButton('Сохранить')

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
    popupWithFormAddCard.changeTextOfButton('Сохранение...');
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
      .then(() => {
        popupWithFormAddCard.close()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        })
      .finally((isLoading) => {
        popupWithFormAddCard.changeTextOfButton('Создать');

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
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      })

    },
    (id) => {

      if(card.isLiked()) {

        api.deleteLikes(id)
        .then(res => {
        card.setLikes(res.likes)
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });

      } else {
          api.addLikes(id)
          .then(res => {
          card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }

    })

  // Создаём карточку и возвращаем наружу
  const cardItem = card.generateCard();

  return cardItem;
}

// создаем Section
const cardsList = new Section('.elements');

const cardConfirmDelete = new PopupWithForm('.popup_type_delete-confirm', {
  submitHandlerForm: () => {
  api.deleteConfirmCard(id)
  }
});

cardConfirmDelete.setEventListeners();

const updateUserAvatar = new PopupWithForm('.popup_type_update-avatar', {
  submitHandlerForm: (valuesInput) => {
    updateUserAvatar.changeTextOfButton('Сохранение...');
    api.updateAvatar(valuesInput.avatar)
      .then(res => {

        userInfo.setUserInfo(res.name, res.about, res.avatar);

      })
      .then(() => {
        updateUserAvatar.close()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally((isLoading) => {
        updateUserAvatar.changeTextOfButton('Сохранить');

      })
  }
});

updateUserAvatar.setEventListeners();

openUpdateAvatarForm.addEventListener('click', () => {
  updateUserAvatar.open();
  formUpdateAvatarValidate.toggleButtonState();

})


