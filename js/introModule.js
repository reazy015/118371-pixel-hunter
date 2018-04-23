import getElementFromTemplate from './domConstructor';
import footerTemplate from './template/footer-template';
import showScreen from './showScreen.js';
import greetingScreen from './greetingModule.js';

const introScreenTemplate = `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
`;

const introScreen = getElementFromTemplate(`
  ${introScreenTemplate}
  ${footerTemplate}
`);

const startBtn = introScreen.querySelector(`.intro__asterisk`);

startBtn.addEventListener(`click`, function () {
  showScreen(greetingScreen);
});

export default introScreen;
