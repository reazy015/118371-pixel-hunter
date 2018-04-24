import getElementFromTemplate from './domConstructor';
import getRandomElement from './utils/getRandomElement';
import getUniqueItemsArray from './utils/getUniqueArray';
import pictures from './data/pictures';
import {gameTypes} from "./gameConstants";
import headerTemplate from './template/header-template';
import footerTemplate from './template/footer-template';
import statsInfoTemplate from './template/stats-info-template';
import getAnswerType from './getAnswerType';
import recordAnswer from './recordAnswer';
import renderGame from './renderGame';
import returnToMainScreen from './returnToMainScreen';

const RIGHT_TYPE_IMG = `paint`;

const gameThreeScreen = (data, gameState) => {
  let imgList = getUniqueItemsArray(pictures, 4);

  const gameTemplate = `
  <div class="game">
    <p class="game__task">${data.text}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${imgList[0].imgSrc}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${imgList[1].imgSrc}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${imgList[2].imgSrc}" alt="Option 1" width="304" height="455">
      </div>
    </form>
    <div class="stats">
      ${statsInfoTemplate(gameState)}
    </div>
  </div>`;

  const gameScreen = getElementFromTemplate(`
    ${headerTemplate(gameState)}
    ${gameTemplate}
    ${footerTemplate}
  `);

  const backToMainScreenBtn = gameScreen.querySelector(`.back`);
  const gameContent = gameScreen.querySelector(`.game__content`);
  const imgSourceArray = imgList.map((item) => item.imgSrc);

  gameContent.addEventListener(`click`, (evt) => {
    let target = evt.target;
    let targetImgSrc = target.children[0].src;
    if (target.classList.contains('game__option')) {
      let answerIndex = imgSourceArray.indexOf(targetImgSrc);
      let isCorrect = imgList[answerIndex].imgType === RIGHT_TYPE_IMG;
      let answerType = getAnswerType(gameState.time);

      recordAnswer(isCorrect, answerType, gameState);
      renderGame(gameState, getRandomElement(gameTypes).type);
    }
  });

  backToMainScreenBtn.addEventListener(`click`, returnToMainScreen);

  return gameScreen;
};

export default gameThreeScreen;
