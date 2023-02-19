export class Section {
  #container;
  #renderer;

  constructor({ renderer }) {
    this.#renderer = renderer;
    this.#container = document.querySelector('.elements');
  }

  render(items) {
    items.reverse().forEach((item) => {
      this.#renderer(item);
    });
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}