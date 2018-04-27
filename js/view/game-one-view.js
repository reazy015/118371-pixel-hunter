import AbstractView from './abstract-view';
import headerTemplate from '../template/header-template';
import footerTemplate from '../template/footer-template';
import statsInfoTemplate from '../template/stats-info-template';
import getRandomElement from '../utils/getRandomElement';
import pictures from '../data/pictures';

export default class GameOneScreen extends AbstractView {
  constructor(gameType, gameState) {
    super();
    this.gameType = gameType;
    this.gameState = gameState;
    this.statsInfoPanel = statsInfoTemplate(this.gameState);
    this.img = getRandomElement(pictures);
  }

  get template() {
    return `
    ${headerTemplate(this.gameState)}
    <div class="game">
      <p class="game__task">${this.gameType.text}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.img.imgSrc}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <div class="stats">
        ${this.statsInfoPanel}
      </div>
    </div>
    ${footerTemplate}
    `;
  }

  bind() {
    const backToMainScreenBtn = this.element.querySelector(`.back`);
    const form = this.element.querySelector(`.game__content`);
    const answersList = form.querySelectorAll(`input[name='question1']`);

    backToMainScreenBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.backToMainScreen();
    });

    form.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this.onFormClick(answersList, this.img.imgType);
    });
  }

  backToMainScreen() {}
  onFormClick() {}
}
