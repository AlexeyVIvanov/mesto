
let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('#topfield');
let professionInput = document.querySelector('#bottomfield');

let nameProfile = document.querySelector('.profile__title');
let professionProfile = document.querySelector('.profile__subtitle');

// Открытие-закрытие Попапа

openPopupButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
  // Проставление данных из разметки в инпуты в момент открытия
  nameInput.value = nameProfile.textContent;
  professionInput.value = professionProfile.textContent;
});

closePopupButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened')
  // Сброс полей формы при закрытии
  formElement.reset()
});

// Обработчик «отправки» формы

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Получите значение полей jobInput и nameInput из свойства value
nameInput.textContent = nameInput.value;
professionInput.textContent = professionInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
nameProfile.textContent = nameInput.value;
professionProfile.textContent = professionInput.value;
// Закрытие Попапа после нажатия кнопки Сохранить
popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



