// Создаём класс Card, который создаёт карточку с текстом и ссылкой на изображение

export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(data, cardSelector, openPopupPicture) {

      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;

      this._openPopupPicture = openPopupPicture;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListenersInCard();

    // Добавим данные
    const cardImage = this._element.querySelector('.elements__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  _handleLikeActivated = (evt) => {
    evt.target.classList.toggle('elements__like_active');
  }

  _handleDeleteCard = () => {
    this._element.remove();
  }


  //добавляем  слушатели клика
  _setEventListenersInCard() {

    // лайки
    this._element.querySelector('.elements__like').addEventListener('click', this._handleLikeActivated);

    // корзина
    this._element.querySelector('.elements__trash').addEventListener('click', this._handleDeleteCard);

    // картинка
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openPopupPicture(this._name, this._link)
   });
  }
};
