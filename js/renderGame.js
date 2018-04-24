import gameOneScreen from './game1Module';
import gameTwoScreen from './game2Module';
import gameThreeScreen from './game3Module';
import statsScreen from './statsModule';
import {gameTypes, GAME_CONDITIONS} from "./gameConstants";
import showScreen from './showScreen';

const renderGame = (gameState, questionType) => {
  if (gameState.lives === 0) {
    gameState. win = false;
    showScreen(statsScreen(gameState));
  } else if (gameState.questionNumber === GAME_CONDITIONS.MIN_REQUIRED_ANSWERS) {
    gameState.win = true;
    showScreen(statsScreen(gameState));
    console.log(gameState);
  } else {
    switch (questionType) {
      case `game1`:
        showScreen(gameOneScreen(gameTypes[2], gameState));
        break;
      case `game2`:
        showScreen(gameTwoScreen(gameTypes[2], gameState));
        break;
      case `game3`:
        showScreen(gameThreeScreen(gameTypes[2], gameState));
        break;
    }
    console.log(questionType);
  }
};

export default renderGame;
