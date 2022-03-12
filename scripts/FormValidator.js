
export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
  }

  // показ ошибки
  _showInputError(inputSelector, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  // скрытие ошибки
  _hideInputError(inputSelector) {
    const errorElement = this._form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  //   проверка валидности инпутов
  _checkInputValidity(inputSelector) {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  };

  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true

      return !inputSelector.validity.valid;
    })
  };

    // функция статуса кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }


  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._checkInputValidity(inputSelector);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {

    this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
  };

}




