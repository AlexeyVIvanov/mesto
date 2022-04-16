
export class Section {

  constructor(containerSelector) {

    this._container = document.querySelector(containerSelector);
  }

  addItem(card) {
    this._container.prepend(card);
  }

  renderItems({ data, renderer }) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

}
