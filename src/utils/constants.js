
const openEditFormButton = document.querySelector('.profile__edit-button');

const openUpdateAvatarForm = document.querySelector('.profile__avatar')

const formEditProfile = document.forms.form1;

const inputNameOfEditForm = formEditProfile.elements.name;

const inputProfessionOfEditForm = formEditProfile.elements.profession;

const openFormAddCardButton = document.querySelector('.profile__add-button');

const formAddCard = document.forms.form2;

const buttonSubmitFormAddCard = formAddCard.querySelector('.popup__submit-add-card');

const formUpdateAvatar = document.forms.form4;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export {
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
}
