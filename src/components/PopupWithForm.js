import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitHandlerForm}) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;

    this._form = this._popup.querySelector('.popup__form');

  }
  //собирает данные всех полей формы.

  // И потом передать  _getInputValues()  передать в колбэк, чтобы мог
  //пользоваться объектом, который создал выше
  _getInputValues() {
    const inputList = [...this._form.querySelectorAll('.popup__input')];
    const valuesInput = {};
    inputList.forEach((input) => {
      valuesInput[input.name] = input.value;
    })
    return valuesInput;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset()
  }

  _handleEscClose() {
    super._handleEscClose();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitHandlerForm(this._getInputValues());

      this.close();

    });

  }

}
