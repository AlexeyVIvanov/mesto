import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitHandlerForm}) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;

    this._form = this._popup.querySelector('.popup__form');
    this._button = this._form.querySelector('.popup__submit');

    this._inputList = [...this._form.querySelectorAll('.popup__input')];

  }

  changeTextOfButton(text) {
    this._button.innerText = text;
  }

  //собирает данные всех полей формы.

  // И потом передать  _getInputValues()  передать в колбэк, чтобы мог
  //пользоваться объектом, который создал выше
  _getInputValues() {
    const valuesInput = {};
    this._inputList.forEach((input) => {
      valuesInput[input.name] = input.value;
    })
    return valuesInput;
  }

  close() {
    super.close();
    this._form.reset()
  }

  changeSubmitHandler(newHandlerSubmit) {
    this._submitHandlerForm = newHandlerSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitHandlerForm(this._getInputValues());

    });

  }

}
