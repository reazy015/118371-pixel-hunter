import AbstractView from '../abstract-view';

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this.title = `Правила`;
    this.description = `Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?`;
  }

  get template() {
    return `
    <div class="rules">
      <h1 class="rules__title">${this.title}</h1>
      <p class="rules__description">${this.description}</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>`;
  }

  bind() {
    this.nameField = this.element.querySelector(`.rules__input`);
    this.buttonSubmit = this.element.querySelector(`.rules__button`);

    this.nameField.addEventListener(`input`, () => this.onInputChange(this.nameField.value));

    this.buttonSubmit.onclick = () => this.onFormSubmit();
  }

  enableButton() {
    this.buttonSubmit.disabled = false;
  }

  disableButton() {
    this.buttonSubmit.disabled = true;
  }

  onInputChange() {}

  onFormSubmit() {}
}
