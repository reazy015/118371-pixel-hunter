import AbstractView from './abstract-view';
import headerTemplate from '../template/header-template';
import footerTemplate from '../template/footer-template';
import statsInfoTemplate from '../template/stats-info-template';
import getUniqueArray from '../utils/getUniqueArray';
import pictures from '../data/pictures';

export default class GameTwoScreen extends AbstractView {
  constructor(gameType, gameState) {
    super();
    this.gameType = gameType;
    this.gameState = gameState;
    this.statsInfoTemplate = statsInfoTemplate(this.gameState);
    this.imagesList = getUniqueArray(pictures, 2);
  }

  get template() {
    return `
    ${headerTemplate(this.gameState)}
    <div class="game">
    <p class="game__task">${this.gameType.text}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this.imagesList[0].imgSrc}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this.imagesList[1].imgSrc}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      ${this.statsInfoTemplate}
    </div>
  </div>
    ${footerTemplate}
    `;
  }

  bind() {
    const backToMainScreenBtn = this.element.querySelector(`.back`);
    const form = this.element.querySelector(`.game__content`);

    backToMainScreenBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.backToMainScreen();
    });

    form.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this.nextGameScree(this.imagesList);
    });
  }

  backToMainScreen() {}
  nextGameScree() {}
}
