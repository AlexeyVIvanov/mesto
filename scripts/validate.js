
const buttonEditProfile = document.querySelector('.popup__submit-edit-profile');
const buttonCreateCard = document.querySelector('.popup__submit-add-card');
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector('.popup__input-error');

// функция, которая отвечает за состояние кнопки сабмита
function SubmitButtonEditProfileState(formInput, buttonEditProfile) {
  if (checkInputValidity(formInput)) {
    buttonEditProfile.removeAttribute('disabled');
    buttonEditProfile.classList.remove('popup__submit_disabled');
  } else {
    buttonEditProfile.setAttribute('disabled', true);
    buttonEditProfile.classList.add('popup__submit_disabled');
  }

}

function SubmitButtonCreateCardState(checkInputValidity, buttonCreateCard) {
  if (checkInputValidity) {
    buttonCreateCard.removeAttribute('disabled');
    buttonCreateCard.classList.remove('popup__submit_disabled');
  } else {
    buttonCreateCard.setAttribute('disabled', true);
    buttonCreateCard.classList.add('popup__submit_disabled');
 }

}

// слушатели событий и функции показа ошибок

// показ ошибки
const errorShow = (input, errorMessage) => {
  input.classList.add('popup__input_type_error');
  // текст ошибки помещаем в span
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

// скрытие ошибки
const errorHide = (input) => {
  input.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  // убираем текст
  formError.textContent = '';
};



// проверяем на валидность введенные данные
const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    // показываем сообщение об ошибке
    errorShow(formInput, formInput.validationMessage);
  } else {
    errorHide(formInput);
  }
};





formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});



// вешаем обработчик событий на все inputы

//formEditProfile.addEventListener('input', function (evt) {
///  const isValid = inputNameOfEditForm.value.length > 0 && inputProfessionOfEditForm.value.length > 0;
 // SubmitButtonEditProfileState(isValid);
//});

//formAddCard.addEventListener('input', function (evt) {
//  const isValid = inputNameOfPlaceOfAddForm.value.length > 0 && inputLinkOfAddForm.value.length > 0;
//  SubmitButtonCreateCardState(isValid);
//});



// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//enableValidation({
//  formSelector: '.popup__form',
//  inputSelector: '.popup__input',
//  submitButtonSelector: '.popup__button',
//  inactiveButtonClass: 'popup__button_disabled',
//  inputErrorClass: 'popup__input_type_error',
//  errorClass: 'popup__error_visible'
//});
