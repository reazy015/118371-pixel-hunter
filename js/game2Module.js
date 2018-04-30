import {gameTypes} from "./gameConstants";
import getAnswerType from './getAnswerType';
import recordAnswer from './recordAnswer';
import getRandomElement from './utils/getRandomElement';
import returnToMainScreen from './returnToMainScreen';
import renderGame from "./renderGame";
import GameTwoScreen from './view/game-two-view';

const gameTwoScreen = (data, gameState) => {
  const gameScreen = new GameTwoScreen(data, gameState);

  gameScreen.backToMainScreen = returnToMainScreen;

  gameScreen.nextGameScree = (imagesList) => {
    let answers = document.querySelectorAll(`input[type='radio']:checked`);
    if (answers.length === 2) {
      let firstAnswer = answers[0].value;
      let secondAnswer = answers[1].value;
      let isCorrect = firstAnswer === imagesList[0].imgType && secondAnswer === imagesList[1].imgType;
      let answerType = getAnswerType(gameState.time);
      recordAnswer(isCorrect, answerType, gameState);
      renderGame(gameState, getRandomElement(gameTypes).type);
    }
  };

  return gameScreen.element;
};

export default gameTwoScreen;
