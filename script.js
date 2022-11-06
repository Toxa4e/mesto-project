// При загрузке на странице должно быть 6 карточек, которые добавит JavaScript
const initialCards = [
    { name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    { name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    { name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    { name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    { name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    { name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]; 

const elements = document.querySelector('.elements');
  function addItem() {
    
    for (let i = 0; i < 6; i++) {
      //получаем содержимое
      const elementTemplate = document.querySelector('#element').content; 
      //клонируем содержимое elementTemplate
      const elementElement = elementTemplate.querySelector('.element').cloneNode(true); 
      // наполняем содержимым (карточки)
      elementElement.querySelector('.element__photo').src = `${initialCards[i].link}`;
      elementElement.querySelector('.element__photo').alt = `${initialCards[i].name}`;        
      elementElement.querySelector('.element__title').textContent = `${initialCards[i].name}`;
      // наполняем содержимым (открывающиеся картинки)
      //elementElement.querySelector('.figure__picture').src = `${initialCards[i].link}`;
      //elementElement.querySelector('.figure__picture').alt = `${initialCards[i].name}`;
      //elementElement.querySelector('.figure__figcaption').textContent = `${initialCards[i].name}`;
      
      elements.prepend(elementElement); // отображаем на странице

      //открытие картинки по нажатию на неё
      const figureElement = document.querySelector('.figure');
      const pictureElement = document.querySelector('.figure__picture');
      const figcaptionElement = document.querySelector('.figure__figcaption');
      const photoElement = elementElement.querySelector('.element__photo').addEventListener('click', function () {
        pictureElement.src = elementElement.querySelector('.element__photo').src;
        pictureElement.alt = elementElement.querySelector('.element__photo').src;
        figcaptionElement.textContent = elementElement.querySelector('.element__title').textContent;
        figureElement.classList.toggle('figure_opened');     
      });
      //закрытие картинки по нажатию на иконку крестика
      const close_icon = document.querySelector('.figure__close-icon').addEventListener('click', function () {
        figureElement.classList.remove('figure_opened');
      });
            
      //кнопка лайк для карточки
      const likeButton = document.querySelector('.element__button'); 
      likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_active');
      });
      //кнопка удаления карточки и картинки
      const buttonDelet = document.querySelector('.element__del-button'); 
      buttonDelet.addEventListener('click', function () {
          const listItem = buttonDelet.closest('.element');
          listItem.remove();
      });
    }
  }
addItem();


// Находим форму редактирования профиля в DOM
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.form');
const nameImput = document.getElementById('name');
const hobbiInput = document.getElementById('hobbi');

// Обработчик «отправки» формы
const profileTitle = document.querySelector('.profile__title');
// Элементы, куда должны быть вставлены значения полей
const profileSubtitle = document.querySelector('.profile__subtitle');

// При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, 
// которые отображаются на странице.
nameImput.value = profileTitle.textContent;
hobbiInput.value = profileSubtitle.textContent; 

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    console.log(`Имя профиля: ${nameImput.value}`);
    console.log(`Хобби: ${hobbiInput.value}`);
    
    //новые значения textContent
    profileTitle.textContent = nameImput.value;
    profileSubtitle.textContent = hobbiInput.value;
    
    popup.classList.toggle('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

// кнопка редактирование профиля открывает popup
const edit_button = document.querySelector('.profile__edit-button').addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
});
// кнопка закрытия для popup
const close_icon = document.querySelector('.popup__close-icon').addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
  nameImput.value = profileTitle.textContent;
  hobbiInput.value = profileSubtitle.textContent;
});


//  Находим форму добавления карточек в DOM
const popupItem = document.querySelector('.popup-item');
const formItem = document.querySelector('.form-item');
const nameCard = document.getElementById('name-card');
const linkCard = document.getElementById('link-card');

// Обработчик «отправки» формы
function itemFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    console.log(`Название места: ${nameCard.value}`);
    console.log(`Ссылка: ${linkCard.value}`);// Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    //третий способ
    const elementTemplate = document.querySelector('#element').content; 
      //клонируем содержимое elementTemplate
      const elementElement = elementTemplate.querySelector('.element').cloneNode(true); 
      // наполняем содержимым (карточки)
      elementElement.querySelector('.element__photo').src = `${linkCard.value}`;
      elementElement.querySelector('.element__photo').alt = `${nameCard.value}`;        
      elementElement.querySelector('.element__title').textContent = `${nameCard.value}`;
      // наполняем содержимым (открывающиеся картинки)
      elementElement.querySelector('.figure__picture').src = `${linkCard.value}`;
      elementElement.querySelector('.figure__picture').alt = `${nameCard.value}`;
      elementElement.querySelector('.figure__figcaption').textContent = `${nameCard.value}`;
      
      elements.prepend(elementElement); // отображаем на странице

    //открытие картинки по нажатию на неё
    const figureElement = elementElement.querySelector('.figure');
    const photoElement = elementElement.querySelector('.element__photo').addEventListener('click', function () {
      figureElement.classList.toggle('figure_opened');
      console.log(`все классы для формы: ${figureElement.classList}`);      
    });
    //закрытие картинки по нажатию на иконку крестика
    const close_icon = document.querySelector('.figure__close-icon').addEventListener('click', function () {
      figureElement.classList.toggle('figure_opened');
    });

    const buttonDelet = document.querySelector('.element__del-button'); //кнопка удаления
    buttonDelet.addEventListener('click', function () {
        const listItem = buttonDelet.closest('.element');
        listItem.remove();
    });

    const likeButton = document.querySelector('.element__button'); //кнопка лайка
    likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');});

    popupItem.classList.toggle('popup-item_opened');
    nameCard.value = '';
    linkCard.value = '';
}

// Прикрепляем обработчик к форме
formItem.addEventListener('submit', itemFormSubmit); 

const profileButton = document.querySelector('.profile__button');
const closeIcon = document.querySelector('.popup-item__close-icon');

function editItemClass() {
  popupItem.classList.toggle('popup-item_opened');
  //console.log(`все классы для формы: ${popup.classList}`);

  nameCard.value = '';
  linkCard.value = '';
}

profileButton.addEventListener('click', editItemClass);
closeIcon.addEventListener('click', editItemClass);

