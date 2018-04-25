import getElementFromTemplate from './domConstructor.js';
import returnToMainScreen from './returnToMainScreen';
import scoreCount from './scoreCount';
import {GAME_CONDITIONS} from "./gameConstants";
import statsInfoTemplate from './template/stats-info-template';
import headerTemplate from './template/header-template';
import footerTemplate from './template/footer-template';

const statsScreen = (gameState) => {
  let title = gameState.win ? `Победа!` : `Поражение!`;

  const correctAnswers = gameState.answers.filter((answer) => answer !== `wrong` && answer !== `unknown`).length;
  const pointsForCorrectAnswers = correctAnswers * GAME_CONDITIONS.CORRECT_ANSWER;

  let templateCorrectScores = ``;
  if (gameState.win) {
    templateCorrectScores = `
      <td class="result__points">${GAME_CONDITIONS.CORRECT_ANSWER}</td>
      <td class="result__total">${pointsForCorrectAnswers}</td>
    `;
  } else {
    templateCorrectScores = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">${title}</td>    
    `;
  }

  const fastAnswers = gameState.answers.filter((answer) => answer === `fast`).length;
  const pointsForFastAnswers = fastAnswers * GAME_CONDITIONS.FAST_ANSWER;

  let fastAnswerTemplate = ``;
  if (gameState.win && fastAnswers) {
    fastAnswerTemplate = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;${GAME_CONDITIONS.FAST_ANSWER}</td>
      <td class="result__total">${pointsForFastAnswers}</td>
    </tr>
    `;
  }

  const slowAnswers = gameState.answers.filter((answer) => answer === `slow`).length;
  const pointsForSlowAnswers = -slowAnswers * GAME_CONDITIONS.BONUS;

  let slowAnswerTemplate = ``;
  if (gameState.win && slowAnswers) {
    slowAnswerTemplate = `
     <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;${GAME_CONDITIONS.BONUS}</td>
      <td class="result__total">-${pointsForSlowAnswers}</td>
    </tr> 
    `;
  }

  let lives;
  if (gameState.lives > 0) {
    lives = gameState.lives;
  } else {
    lives = 0;
  }

  const pointsForLives = lives * GAME_CONDITIONS.BONUS;

  let livesTemplate = ``;
  if (gameState.win) {
    livesTemplate = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">×&nbsp;${GAME_CONDITIONS.BONUS}</td>
      <td class="result__total">${pointsForLives}</td>
    </tr>`;
  }

  let totalScoreTemplate = ``;
  if (gameState.win) {
    totalScoreTemplate = `
    <tr>
      <td colspan="5" class="result__total  result__total--final">${scoreCount(gameState.answers, gameState.lives)}</td>
    </tr>`;
  }

  const statsTemplate = `
  <div class="result">
    <h1>${title}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statsInfoTemplate(gameState)}
        </td>
        ${templateCorrectScores}
      </tr>
      ${fastAnswerTemplate}
      ${slowAnswerTemplate}
      ${livesTemplate}
      ${totalScoreTemplate}
    </table> 
  </div>`;

  const finalResultScreen = getElementFromTemplate(`
    ${headerTemplate(gameState)}
    ${statsTemplate}
    ${footerTemplate}  
  `);

  const backToMainScreenBtn = finalResultScreen.querySelector(`.back`);

  backToMainScreenBtn.addEventListener(`click`, returnToMainScreen);

  return finalResultScreen;
};

export default statsScreen;
