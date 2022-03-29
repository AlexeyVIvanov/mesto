
export class Section {
  // item или data
  constructor({data, renderer}, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }
  addItem(card) {
    this._container.append(card);
  }
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }
}
