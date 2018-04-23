import getElementFromTemplate from './domConstructor';
import returnToMainScreen from './returnToMainScreen';
import pictures from './temp/pictures';
import getRandomElement from './utils/getRandomElement';
import headerTemplate from './template/header-template';
import footerTemplate from './template/footer-template';
import statsInfoTemplate from './template/stats-info-template';
import getAnswerType from './getAnswerType';
import recordAnswer from './recordAnswer';
import {gameTypes} from "./gameConstants";
import renderGame from './renderGame';

const gameOneScreen = (data, gameState) => {
  let img = getRandomElement(pictures);
  const screenTemplate = `
      <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${img.imgSrc}" alt="Option 1" width="468" height="458">
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
        <img src="${img.imgSrc}" alt="Option 2" width="468" height="458">
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
    ${statsInfoTemplate(gameState)}
  </div>  
  `;

  const gameScreen = getElementFromTemplate(`
   ${headerTemplate(gameState)}
   ${screenTemplate}
   ${footerTemplate}
  `);

  const backToMainScreenBtn = gameScreen.querySelector(`.back`);
  const gameForm = gameScreen.querySelector(`.game__content`);
  const hasCheckedAnswer = (answers) => {
    return answers.length === 2;
  };
  const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked).value;

  gameForm.addEventListener(`click`, () => {
    let answers = document.querySelectorAll(`input[type="radio"]:checked`);
    if (hasCheckedAnswer(answers)) {
      let answerOnQuestion = getCheckedAnswer(answers);
      let isCorrect = answerOnQuestion === img.imgType;
      let answerType = getAnswerType(gameState.time);
      recordAnswer(isCorrect, answerType, gameState);
      renderGame(gameState, getRandomElement(gameTypes).type);
    }
  });

  backToMainScreenBtn.addEventListener(`click`, returnToMainScreen);

  return gameScreen;
};

export default gameOneScreen;
