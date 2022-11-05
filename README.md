# Mesto
Данный проект был создан по дизайн проекту Figma, для освоения приобретенных навыков программирования на языке HTML и CSS для различных размеров экрана.

Проект состоит из блоков. Каждый полностью автономен, и при необходимости может быть заимствован как готовый.

Были учтены стандарты БЭМ-структуры при создании файловой структуры проекта. Для блоков, элементов и модификаторов есть свои папки с фалами .CSS которые импортированы в один общий index.CSS.

Для расположение контента на странице, были применены стандарты flexbox и позиционирования элементов (relative, absolut).

Сайт сделан по принципу "резиновой" адаптивной верстки с использованием медиа запросов.

Основной особенностью данного проекта является наличие форм которые открываются с помощью JavaScript.

## Страница в браузере
При запуске проекта в браузере, пользователю будет доступен  сайт, основная идея которого - составление своего профиля "историй" путешествий по России в виде фотографий.

# Дизайн проект
Проект является рабочей копией дизайн проекта
[Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

Для этого были экспортированны картинки в виде растровых и векторных изображений с дальнейшей оптимизацией для уменьшения размера файлов и ускорение загрузки страницы. 

## Интерактивность сайта
В проект добавлен script.js написаный на языке програмирования JavaScript. Благодоря этому сайт может реагировать на действия пользователя: управлять тем, что именно он видит на странице; изменять, добавлять и удалять элементы.

## HTML

Для добовления на страницу форм, которые пользователь может заполнять использовались следующие теги

```html

<fieldset>      <!--группирует элементы формы в блок с характерным выделением границ-->
<form>      <!--добавляет на страницу форму-->
<input>      <!--позволяет создавать поле для ввода текста-->

<form action="#" class="form" name="form-popup">
<!-- Элементы формы для получения данных об имени пользователе -->
<input type="text" class="form__input" name="name" required placeholder="Имя">
<!-- Элементы формы для информации о нём -->
<input type="text" class="form__input" name="hobbi" required placeholder="О себе">

<!--Кнопка закрытия формы-->
<button class="popup__close-icon" type="button"></button>

<!--контейнер для хранения HTML-кода для дальнейшего использования в JavaScript-->
<template id="element">


<template id="element">

```

## CSS
С помощью CSS стандартные кнопки и формы были стилизованны

```CSS
.element__button {
    /*...*/

    background-image: url('../../../images/element-group.svg'); 
    }

.form__input {
    border: 0;
    /*...*/
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    /*...*/
    border-bottom:1px solid rgb(0 0 0 / 0.2);
}

```
Для разных состояний кнопки 
```CSS
.element__button:hover {
    opacity: 0.5;
    cursor: pointer;
}

.element__button:active {
    background-image: url('../../../images/element-group_active.svg');
    opacity: 1;
}
```
## JS
С помощью JS стандартные кнопки и формы стали интерактивными

Кнопка лайк для карточки
```JS
const likeButton = document.querySelector('.element__button'); 
      likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_active');
      });
```
Кнопка редактирование профиля открывает popup
```JS
const edit_button = document.querySelector('.profile__edit-button').addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
});
```