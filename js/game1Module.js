import returnToMainScreen from './returnToMainScreen';
import {gameTypes} from "./gameConstants";
import getAnswerType from './getAnswerType';
import recordAnswer from './recordAnswer';
import renderGame from './renderGame';
import getRandomElement from './utils/getRandomElement';
import GameOneView from './view/game-one-view';

const gameOneScreen = (data, gameState) => {
  const gameScreen = new GameOneView(data, gameState);

  gameScreen.backToMainScreen = returnToMainScreen;

  gameScreen.onFormClick = (answers, imgType) => {
    let answer = document.querySelector(`input[type='radio']:checked`);
    if (answer) {
      let answerValue = answer.value;
      let isCorrect = answerValue === imgType;
      let answerType = getAnswerType(gameState.time);
      recordAnswer(isCorrect, answerType, gameState);
      renderGame(gameState, getRandomElement(gameTypes).type);
    }
  };

  return gameScreen.element;
};

export default gameOneScreen;
