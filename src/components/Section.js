export class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach((item) =>
      this._container.append(this._renderer(item))
    );
  }

  renderItem() {
    this._renderer(this._renderedItems);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
