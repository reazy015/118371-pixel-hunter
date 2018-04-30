import AbstractView from './abstract-view';
import footerTemplate from '../template/footer-template';
import headerTemplate from '../template/header-template';

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
      ${headerTemplate()}
      <div class="rules">
        <h1 class="rules__title">${this.title}</h1>
        <p class="rules__description">${this.description}</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>
      ${footerTemplate}
    `;
  }

  bind() {
    const rulesBtn = this.element.querySelector(`.rules__button`);
    const rulesInput = this.element.querySelector(`.rules__input`);
    const backToMainScreenBtn = this.element.querySelector(`.back`);

    rulesBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.nextGameScreen(rulesInput, rulesBtn);
    });

    rulesInput.addEventListener(`input`, (evt) => {
      evt.preventDefault();
      this.onInputChange(evt.target, rulesBtn);
    });

    backToMainScreenBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.backToMainScreen();
    });
  }


  nextGameScreen() {}

  onInputChange() {}

  backToMainScreen() {}
}
