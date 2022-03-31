
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {

      this.close(this._popup);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
      if (evt.target === document.querySelector('.popup_opened')) {
        this.close();
      }
    });
  }

}
