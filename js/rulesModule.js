import getElementFromTemplate from './domConstructor';
import returnToMainScreen from './returnToMainScreen';
import headerTemplate from './template/header-template';
import footerTemplate from './template/footer-template';
import renderGame from './renderGame';
import getGameState from './gameState';
import {gameTypes} from "./gameConstants";
import getRandomElement from './utils/getRandomElement';

const rulesScreenTempalte = `
    <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>

`;
const rulesScreen = getElementFromTemplate(`
  ${headerTemplate()}
  ${rulesScreenTempalte}
  ${footerTemplate}
`);

const rulesBtn = rulesScreen.querySelector(`.rules__button`);
const rulesInput = rulesScreen.querySelector(`.rules__input`);
const backToMainScreenBtn = rulesScreen.querySelector(`.back`);

rulesInput.addEventListener(`input`, (evt) => {
  if (evt.target.value) {
    rulesBtn.disabled = false;
  } else {
    rulesBtn.disabled = true;
  }
});

rulesBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  renderGame(getGameState(), getRandomElement(gameTypes).type);
  rulesInput.value = ``;
  rulesBtn.disabled = true;
});

backToMainScreenBtn.addEventListener(`click`, returnToMainScreen);

export default rulesScreen;
