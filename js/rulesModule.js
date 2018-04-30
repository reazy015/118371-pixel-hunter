import returnToMainScreen from './returnToMainScreen';
import renderGame from './renderGame';
import getGameState from './gameState';
import {gameTypes} from "./gameConstants";
import getRandomElement from './utils/getRandomElement';
import RulesView from './view/rules-view';

const rulesScreen = new RulesView();

rulesScreen.onInputChange = (target, button) => {
  button.disabled = target.value === ``;
};

rulesScreen.backToMainScreen = returnToMainScreen;


rulesScreen.nextGameScreen = (inputField, submitBtn) => {
  renderGame(getGameState(), getRandomElement(gameTypes).type);
  inputField.value = ``;
  submitBtn.disabled = true;
};

// rulesBtn.addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//   renderGame(getGameState(), getRandomElement(gameTypes).type);
//   rulesInput.value = ``;
//   rulesBtn.disabled = true;
// });


export default rulesScreen.element;
