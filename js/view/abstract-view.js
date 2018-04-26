import getElementFromTemplate from '../domConstructor';

export default class AbstractView {
  get template() {
    throw new Error(`You should redefine this method for current view`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
