import {gameTypes} from "./gameConstants";
import getAnswerType from './getAnswerType';
import recordAnswer from './recordAnswer';
import renderGame from './renderGame';
import returnToMainScreen from './returnToMainScreen';
import GameThreeView from './view/game-three-view';
import getRandomElement from "./utils/getRandomElement";

const RIGHT_TYPE_IMG = `paint`;

const gameThreeScreen = (data, gameState) => {
  const gameScreen = new GameThreeView(data, gameState);

  gameScreen.backToMainScreen = returnToMainScreen;

  gameScreen.nextGameScreen = (target, imgList) => {
    const imgSourceArray = imgList.map((item) => item.imgSrc);
    let targetImgSrc = target.children[0].src;
    if (target.classList.contains(`game__option`)) {
      let answerIndex = imgSourceArray.indexOf(targetImgSrc);
      let isCorrect = imgList[answerIndex].imgType === RIGHT_TYPE_IMG;
      let answerType = getAnswerType(gameState.time);
      recordAnswer(isCorrect, answerType, gameState);
      renderGame(gameState, getRandomElement(gameTypes).type);
    }
  };

  return gameScreen.element;
};

export default gameThreeScreen;
