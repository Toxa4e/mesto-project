export class Card {
  _templateSelector;
  _link;
  _name;
  _owner;
  _likes;
  _id;
  _userId;

  _cardElement;
  _cardImage;
  _cardTitle;
  _cardLikeButton;
  _cardLikeCounter;
  _cardDeleteButton;

  _handleDelete;
  _handleImageClick;
  _handleLike;

  constructor(
    templateSelector,
    { name, link, owner, likes, _id },
    userId,
    { handleLike, handleImageClick, handleDelete },) {
    this._templateSelector = templateSelector;
    this._link = link;
    this._name = name;
    this._owner = owner;
    this._likes = likes;
    this._id = _id;
    this._userId = userId;

    this._cardElement = this._getElement();
    this._cardImage = this._cardElement.querySelector('.element__photo');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._cardDeleteButton = this._cardElement.querySelector('.element__del-button');
    this._cardLikeButton = this._cardElement.querySelector('.element__button');
    this._cardLikeCounter = this._cardElement.querySelector('.element__like-number');

    this._handleDelete = handleDelete;
    this._handleImageClick = handleImageClick;
    this._handleLike = handleLike;
  }

  _getElement() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  generate() {
    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name}.`;
    this._cardTitle.textContent = this._name;
    this._cardLikeCounter.textContent = this._likes.length > 0 ? this._likes.length : '';
    this._cardElement.setAttribute('card-id', this._id);

    if (this.isLiked()) {
      this._cardLikeButton.classList.add('element__button_active');
    }

    if (this._owner._id !== this._userId) {
      this._cardDeleteButton.remove();
    }

    this._setEventListeners();
    return this._cardElement;
  }

  getData() {
    return {
      link: this._link,
      name: this._name,
      owner: this._owner,
      likes: this._likes,
      id: this._id,
    };
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  changeLike(card) {
    this._likes = card.likes;

    if (this.isLiked()) {
      this._cardLikeButton.classList.add('element__button_active')
    } else {
      this._cardLikeButton.classList.remove('element__button_active')
    }

    this._cardLikeCounter.textContent = this._likes.length > 0 ? this._likes.length : '';
  }

  remove() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this);
    });

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLike(this);
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDelete(this);
    });
  }
}