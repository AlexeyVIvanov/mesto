// Создаём класс Card, который создаёт карточку с текстом и ссылкой на изображение

export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(data, cardSelector, openPopupPicture, deleteConfirm, handleLikeClick) {

      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._userId = data.userId;
      this._ownerId = data.ownerId;
      this._id = data.id;

      this._cardSelector = cardSelector;

      this._openPopupPicture = openPopupPicture;
      this._deleteConfirm = deleteConfirm;
      this._handleLikeClick = handleLikeClick;
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

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector('.elements__like-count');
    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._activeLike()
    } else {
      this._disableLike()
    }

  }

  _activeLike = () => {
    this._element.querySelector('.elements__like').classList.add('elements__like_active');
  }

  _disableLike = () => {
    this._element.querySelector('.elements__like').classList.remove('elements__like_active');
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

    this.setLikes(this._likes);

    if(this._ownerId !== this._userId) {
      this._element.querySelector('.elements__trash').style.display = 'none';
    }

    // Вернём элемент наружу
    return this._element;
  }

  isLiked() {
    const userHasLikeCard = this._likes.find(user => user._id === this._userId);

    return userHasLikeCard;
  }


  handleDeleteCard = () => {
    this._element.remove();
  }


  //добавляем  слушатели клика
  _setEventListenersInCard() {

    // лайки
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });

    // корзина
    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._deleteConfirm(this._id)
    });

    // картинка
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openPopupPicture(this._name, this._link)
   });
  }
};
