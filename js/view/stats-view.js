import AbstractView from '../abstract-view';
import {AnswerType, Points} from '../utils/constants';
import getScore from '../utils/get-score';
import statsBarTemplate from '../templates/statsBarTemplate';

export default class StatsView extends AbstractView {
  constructor(data) {
    super();
    this.data = data.reverse();
    this.title = this.data[0].win ? `Победа!` : `Проигрыш`;
    this._templateAllGames = ``;
  }

  _templateCorrectScores(gameState) {
    const correctAnswers = gameState.answers.filter((answer) => answer !== AnswerType.WRONG && answer !== AnswerType.UNKNOWN).length;
    const pointsForCorrectAnswers = correctAnswers * Points.CORRECT;

    if (gameState.win && correctAnswers) {
      return `
    <td class="result__points">×&nbsp;${Points.CORRECT}</td>
    <td class="result__total">${pointsForCorrectAnswers}</td>`;
    } else {
      return `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
    }
  }

  _templateFastScores(gameState) {
    const fastAnswers = gameState.answers.filter((answer) => answer === AnswerType.FAST).length;
    const pointsForFastAnswers = fastAnswers * Points.BONUS;

    if (gameState.win && fastAnswers) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Points.BONUS}</td>
        <td class="result__total">${pointsForFastAnswers}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  _templateSlowScores(gameState) {
    const slowAnswers = gameState.answers.filter((answer) => answer === AnswerType.SLOW).length;
    const pointsForSlowAnswers = -slowAnswers * Points.FINE;

    if (gameState.win && slowAnswers) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Points.FINE}</td>
        <td class="result__total">-${pointsForSlowAnswers}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  _templateLivesScores(gameState) {
    const lives = gameState.lives > 0 ? gameState.lives : 0;
    const pointsForLives = lives * Points.LIFE_BONUS;

    if (gameState.win && lives) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Points.LIFE_BONUS}</td>
        <td class="result__total">${pointsForLives}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  _templateTotalScore(gameState) {
    if (gameState.win) {
      return `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${getScore(gameState.answers, gameState.lives)}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  _getStatsBar(gameState) {
    return statsBarTemplate(gameState);
  }

  _templateOneGame(gameState, index) {
    return `
    <table class="result__table">
      <tr>
        <td class="result__number">${index + 1}.</td>
        <td colspan="2">${this._getStatsBar(gameState)}</td>
        ${this._templateCorrectScores(gameState)}
      </tr>
      ${this._templateFastScores(gameState)}
      ${this._templateSlowScores(gameState)}
      ${this._templateLivesScores(gameState)}
      ${this._templateTotalScore(gameState)}
    </table>`;
  }

  _getTemplates(data) {
    data.forEach((gameState, index) => {
      this._templateAllGames += this._templateOneGame(gameState, index);
    });
  }

  get template() {
    this._getTemplates(this.data);
    return `
    <div class="result">
      <h1>${this.title}</h1>
      ${this._templateAllGames}
    </div>`;
  }
}
