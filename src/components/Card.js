export class Card {
  #link;
  #name;
  #owner;
  #likes;
  #id;
  #userId;

  #cardElement;
  #cardImage;
  #cardTitle;
  #cardLikeButton;
  #cardLikeCounter;
  #cardDeleteButton;

  #handleDelete;
  #handleImageClick;
  #handleLike;

  constructor(
    { name, link, owner, likes, _id },
    userId,
    { handleLike, handleImageClick, handleDelete },) {
    this.#link = link;
    this.#name = name;
    this.#owner = owner;
    this.#likes = likes;
    this.#id = _id;
    this.#userId = userId;

    this.#cardElement = this.#getElement();
    this.#cardImage = this.#cardElement.querySelector('.element__photo');
    this.#cardTitle = this.#cardElement.querySelector('.element__title');
    this.#cardDeleteButton = this.#cardElement.querySelector('.element__del-button');
    this.#cardLikeButton = this.#cardElement.querySelector('.element__button');
    this.#cardLikeCounter = this.#cardElement.querySelector('.element__like-number');

    this.#handleDelete = handleDelete;
    this.#handleImageClick = handleImageClick;
    this.#handleLike = handleLike;
  }

  #getElement() {
    return document.querySelector('#element').content.querySelector('.element').cloneNode(true);
  }

  generate() {
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = `${this.#name}.`;
    this.#cardTitle.textContent = this.#name;
    this.#cardLikeCounter.textContent = this.#likes.length > 0 ? this.#likes.length : '';
    this.#cardElement.setAttribute('card-id', this.#id);

    if (this.isLiked()) {
      this.#cardLikeButton.classList.add('element__button_active');
    }

    if (this.#owner._id !== this.#userId) {
      this.#cardDeleteButton.remove();
    }

    this.#setEventListeners();
    return this.#cardElement;
  }

  getData() {
    return {
      link: this.#link,
      name: this.#name,
      owner: this.#owner,
      likes: this.#likes,
      id: this.#id,
    };
  }

  isLiked() {
    return this.#likes.some((like) => like._id === this.#userId);
  }

  changeLike(card) {
    this.#likes = card.likes;

    if (this.isLiked()) {
      this.#cardLikeButton.classList.add('element__button_active')
    } else {
      this.#cardLikeButton.classList.remove('element__button_active')
    }

    this.#cardLikeCounter.textContent = this.#likes.length > 0 ? this.#likes.length : '';
  }

  remove() {
    this.#cardElement.remove();
  }

  #setEventListeners() {
    this.#cardImage.addEventListener('click', () => {
      this.#handleImageClick(this);
    });

    this.#cardLikeButton.addEventListener('click', () => {
      this.#handleLike(this);
    });

    this.#cardDeleteButton.addEventListener('click', () => {
      this.#handleDelete(this);
    });
  }
}