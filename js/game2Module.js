import getElementFromTemplate from './domConstructor';
import pictures from './data/pictures';
import {gameTypes} from "./gameConstants";
import statsInfoTemplate from './template/stats-info-template';
import headerTemplate from './template/header-template';
import footerTemplate from './template/footer-template';
import getAnswerType from './getAnswerType';
import recordAnswer from './recordAnswer';
import getRandomElement from './utils/getRandomElement';
import returnToMainScreen from './returnToMainScreen';
import renderGame from "./renderGame";

const gameTwoScreen = (data, gameState) => {
  let img = getRandomElement(pictures);
  const screenTemplate = `
  <div class="game">
    <p class="game__task">${data.text}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${img.imgSrc}" alt="Option 1" width="705" height="455">
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

  gameForm.addEventListener(`click`, () => {
    let answer = document.querySelector(`input[type="radio"]:checked`);
    if (answer) {
      let answerValue = answer.value;
      let isCorrect = answerValue === img.imgType;
      let answerType = getAnswerType(gameState.time);
      recordAnswer(isCorrect, answerType, gameState);
      renderGame(gameState, getRandomElement(gameTypes).type);
    }
  });

  backToMainScreenBtn.addEventListener(`click`, returnToMainScreen);

  return gameScreen;
};

export default gameTwoScreen;
