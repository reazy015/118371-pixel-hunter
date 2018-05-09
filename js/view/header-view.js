import AbstractView from "../abstract-view";

export default class HeaderView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    if (this.gameState) {
      return `
      <header class="header">
        ${this._headerBtn()}
        <h1 class="game__timer">${this.gameState.time}</h1>
        <div class="game__lives">
          ${new Array(3 - this.gameState.lives).fill(this._heartEmpty()).join(``)}
          ${new Array(this.gameState.lives).fill(this._heartFull()).join(``)}
        </div>
      </header>`;
    }
    return `<header class="header">${this._headerBtn()}</header>`;
  }

  _headerBtn() {
    return `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>`;
  }

  _heartEmpty() {
    return `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`;
  }

  _heartFull() {
    return `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`;
  }

  bind() {
    this.timer = this.element.querySelector(`.game__timer`);
    this.backButton = this.element.querySelector(`.back`);
    this.backButton.onclick = (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    };
    if (this.gameState && this.gameState.time <= 5) {
      this.timer.classList.add(`game__timer--flash`);
    }
  }

  onBackButtonClick() {}

}
