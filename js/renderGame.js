import gameOneScreen from './game1Module';
// import gameTwoScreen from './game2Module';
// import gameThreeScreen from './game3Module';
import statsSreen from './template/stats-info-template';
import {gameTypes, GAME_CONDITIONS} from "./gameConstants";
import showScreen from './showScreen';

const renderGame = (gameState, questionType) => {
  if (gameState.lives === 0) {
    gameState. win = false;
    showScreen(statsSreen(gameState));
  } else if (gameState.questionNumber === GAME_CONDITIONS.MIN_REQUIRED_ANSWERS) {
    gameState.win = true;
    showScreen(statsSreen(gameState));
  } else {
    showScreen(gameOneScreen(gameTypes[0], gameState));
  }
};

export default renderGame;
