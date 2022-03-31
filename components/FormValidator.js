
export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
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

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputSelector) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true

      return !inputSelector.validity.valid;
    })
  };

    // функция статуса кнопки
  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }


  _setEventListeners() {
    // чтобы проверить состояние кнопки в самом начале
    this.toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._checkInputValidity(inputSelector);
        // чтобы проверять его при изменении любого из полей
        this.toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

  resetErrors(){
    this._inputList.forEach((inputSelector) => {
      this._hideInputError(inputSelector);
    });
  }

}




