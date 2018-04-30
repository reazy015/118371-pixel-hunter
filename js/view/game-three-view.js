import AbstractView from './abstract-view';
import headerTemplate from '../template/header-template';
import footerTemplate from '../template/footer-template';
import statsInfoTemplate from '../template/stats-info-template';
import getUniqueArray from '../utils/getUniqueArray';
import pictures from '../data/pictures';

export default class GameThreeView extends AbstractView {
  constructor(gameType, gameState) {
    super();
    this.gameType = gameType;
    this.gameState = gameState;
    this.statsInfoTemplate = statsInfoTemplate(this.gameState);
    this.imagesList = getUniqueArray(pictures, 3);
  }

  get template() {
    return `    
    ${headerTemplate(this.gameState)}
    <div class="game">
      <p class="game__task">${this.gameType.text}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.imagesList[0].imgSrc}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.imagesList[1].imgSrc}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.imagesList[2].imgSrc}" alt="Option 1" width="304" height="455">
        </div>
      </form>
      <div class="stats">
        ${this.statsBar}
      </div>
    </div>
    ${footerTemplate}`;
  }

  bind() {
    const backToMainScreenBtn = this.element.querySelector(`.back`);
    const form = this.element.querySelector(`.game__content`);

    backToMainScreenBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.backToMainScreen();
    });

    form.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.nextGameScreen(evt.target, this.imagesList);
    });
  }

  backToMainScreen() {}
  nextGameScreen() {}
}
