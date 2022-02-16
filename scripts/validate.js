
// показ ошибки
const showInputError = (formSelector, inputSelector,  errorClass, inputErrorClass, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// скрытие ошибки
const hideInputError = (formSelector, inputSelector,  errorClass, inputErrorClass) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//   проверка валидности инпутов
const checkInputValidity = (formSelector, inputSelector,  errorClass, inputErrorClass) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector,  errorClass, inputErrorClass, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector,  errorClass, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputSelector) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputSelector.validity.valid;
  })
};

const setEventListeners = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass) => {
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonElement = formSelector.querySelector(submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector, errorClass, inputErrorClass);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass);
});
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});


// функция статуса кнопки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
}




