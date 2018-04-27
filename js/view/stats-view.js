import AbstractView from './abstract-view';
import headerTemplate from '../template/header-template';
import footerTemplate from '../template/footer-template';
import statsInfoTemplate from '../template/stats-info-template';
import scoreCount from '../scoreCount';
import {GAME_CONDITIONS, ANSWER_TYPES} from "../gameConstants";

export default class StatsView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
    this.statsInfoTemplate = statsInfoTemplate(this.gameState);
    this.title = gameState.win ? `Победа!` : `Проигрыш!`;
    this.correctAnswers = gameState.answers.filter((answer) => answer !== ANSWER_TYPES.WRONG && answer !== ANSWER_TYPES.UNKNOWN).length;
    this.pointsForCorrectAnswers = this.correctAnswers * GAME_CONDITIONS.CORRECT_ANSWER;
    this.fastAnswers = gameState.answers.filter((answer) => answer === ANSWER_TYPES.FAST).length;
    this.pointsForFastAnswers = this.fastAnswers * GAME_CONDITIONS.BONUS;
    this.slowAnswers = gameState.answers.filter((answer) => answer === ANSWER_TYPES.SLOW).length;
    this.pointsForSlowAnswers = -this.slowAnswers * GAME_CONDITIONS.BONUS;
    this.lives = gameState.lives > 0 ? gameState.lives : 0;
    this.pointsForLives = this.lives * GAME_CONDITIONS.BONUS;
  }

  _templateCorrectScores() {
    if (this.gameState.win && this.correctAnswers) {
      return `
    <td class="result__points">×&nbsp;${GAME_CONDITIONS.CORRECT_ANSWER}</td>
    <td class="result__total">${this.pointsForCorrectAnswers}</td>`;
    } else {
      return `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">${this.title}</td>`;
    }
  }

  _templateFastScores() {
    if (this.gameState.win && this.fastAnswers) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${GAME_CONDITIONS.BONUS}</td>
        <td class="result__total">${this.pointsForFastAnswers}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  _templateSlowScores() {
    if (this.gameState.win && this.slowAnswers) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this.slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${GAME_CONDITIONS.BONUS}</td>
        <td class="result__total">-${this.pointsForSlowAnswers}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  _templateLivesScores() {
    if (this.gameState.win && this.lives) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${GAME_CONDITIONS.BONUS}</td>
        <td class="result__total">${this.pointsForLives}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  _templateTotalScore() {
    if (this.gameState.win) {
      return `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${scoreCount(this.gameState.answers, this.gameState.lives)}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  get template() {
    return `
    ${headerTemplate()}
    <div class="result">
      <h1>${this.title}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">${this.statsInfoTemplate}</td>
          ${this._templateCorrectScores()}
        </tr>
        ${this._templateFastScores()}
        ${this._templateSlowScores()}
        ${this._templateLivesScores()}
        ${this._templateTotalScore()}
      </table>
    </div>
    ${footerTemplate}`;
  }

  bind() {
    const backToMainScreenBtn = this.element.querySelector(`.back`);
    backToMainScreenBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.backToMainScreen();
    });
  }

  backToMainScreen() {}
}
