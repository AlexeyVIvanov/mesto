import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }

  open(name, link) {
    super.open();
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__image').alt = name;
    this._popup.querySelector('.popup__caption').textContent = name;

  }

  close() {
    super.close();
  }

  _handleEscClose() {
    super._handleEscClose();
  }

  setEventListeners() {
    super.setEventListeners();
  }

}

