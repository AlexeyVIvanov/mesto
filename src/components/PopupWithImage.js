import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageOfPopup = this._popup.querySelector('.popup__image');
    this._captionOfPopup = this._popup.querySelector('.popup__caption');

  }

  open(name, link) {
    super.open();
    this._imageOfPopup.src = link;
    this._imageOfPopup.alt = name;
    this._captionOfPopup.textContent = name;

  }

}

