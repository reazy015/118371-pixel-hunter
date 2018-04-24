import getElementFromTemplate from './domConstructor';
import returnToMainScreen from './returnToMainScreen';
import pictures from './temp/pictures';
import getRandomElement from './utils/getRandomElement';
import createUniqueItemsArray from './utils/getUniqueArray';
import headerTemplate from './template/header-template';
import footerTemplate from './template/footer-template';
import statsInfoTemplate from './template/stats-info-template';
import getAnswerType from './getAnswerType';
import recordAnswer from './recordAnswer';
import {gameTypes} from "./gameConstants";
import renderGame from './renderGame';

const gameOneScreen = (data, gameState) => {
  let img = createUniqueItemsArray(pictures, 2);
  console.log(img);
  const screenTemplate = `
      <div class="game">
    <p class="game__task">${data.text}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${img[0].imgSrc}" alt="Option 1" width="468" height="458">
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
        <img src="${img[1].imgSrc}" alt="Option 2" width="468" height="458">
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
      ${statsInfoTemplate(gameState)}
    </div>
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

  gameForm.addEventListener(`click`, () => {
    let answers = document.querySelectorAll(`input[type="radio"]:checked`);
    if (hasCheckedAnswer(answers)) {
      let firstAnswer = answers[0].value;
      let secondAnswer = answers[1].value;
      let isCorrect = firstAnswer === img[0].imgType && secondAnswer === img[1].imgType;
      let answerType = getAnswerType(gameState.time);
      recordAnswer(isCorrect, answerType, gameState);
      renderGame(gameState, getRandomElement(gameTypes).type);
    }
  });

  backToMainScreenBtn.addEventListener(`click`, returnToMainScreen);

  return gameScreen;
};

export default gameOneScreen;
