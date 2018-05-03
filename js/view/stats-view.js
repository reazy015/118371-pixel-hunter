import AbstractView from '../abstract-view';
import {AnswerType, Points} from '../utils/constants';
import getScore from '../utils/get-score';
import statsBarTemplate from '../templates/statsBarTemplate';

export default class StatsView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
    this.statsBar = statsBarTemplate(this.gameState);
    this.title = gameState.win ? `Победа!` : `Проигрыш`;
    this.correctAnswers = gameState.answers.filter((answer) => answer !== AnswerType.WRONG && answer !== AnswerType.UNKNOWN).length;
    this.pointsForCorrectAnswers = this.correctAnswers * Points.CORRECT;
    this.fastAnswers = gameState.answers.filter((answer) => answer === AnswerType.FAST).length;
    this.pointsForFastAnswers = this.fastAnswers * Points.BONUS;
    this.slowAnswers = gameState.answers.filter((answer) => answer === AnswerType.SLOW).length;
    this.pointsForSlowAnswers = -this.slowAnswers * Points.FINE;
    this.lives = gameState.lives > 0 ? gameState.lives : 0;
    this.pointsForLives = this.lives * Points.LIFE_BONUS;
  }

  _templateCorrectScores() {
    if (this.gameState.win && this.correctAnswers) {
      return `
    <td class="result__points">×&nbsp;${Points.CORRECT}</td>
    <td class="result__total">${this.pointsForCorrectAnswers}</td>`;
    } else {
      return `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
    }
  }

  _templateFastScores() {
    if (this.gameState.win && this.fastAnswers) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Points.BONUS}</td>
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
        <td class="result__points">×&nbsp;${Points.FINE}</td>
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
        <td class="result__points">×&nbsp;${Points.LIFE_BONUS}</td>
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
        <td colspan="5" class="result__total  result__total--final">${getScore(this.gameState.answers, this.gameState.lives)}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  get template() {
    return `
    <div class="result">
      <h1>${this.title}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">${this.statsBar}</td>
          ${this._templateCorrectScores()}
        </tr>
        ${this._templateFastScores()}
        ${this._templateSlowScores()}
        ${this._templateLivesScores()}
        ${this._templateTotalScore()}
      </table>
    </div>`;
  }
}
