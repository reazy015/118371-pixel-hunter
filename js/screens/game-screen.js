import App from '../application';
import HeaderView from "../view/header-view";
import FooterView from "../view/footer-view";
import GameOneView from "../view/game-1-view";
import GameTwoView from "../view/game-2-view";
import GameThreeView from "../view/game-3-view";
import {AnswerType, TimeLimits} from "../utils/constants";
import resizeImagesFromElement from "../utils/resize-image";

const GameType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.data = this.model.gameData;
    this.header = new HeaderView(this.model.gameState);
    this.level = new GameOneView(this.model);
    this.footer = new FooterView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.level.element);
    this.root.appendChild(this.footer.element);
    this._interval = null;
  }

  get element() {
    return this.root;
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.gameState.time <= 0) {
        this.onAnswerGiven(false);
      }
      this.updateHeader();
    }, 1000);
  }

  startGame() {
    this.changeLevel();
    this.startTimer();
  }

  stopGame() {
    clearInterval(this._interval);
  }

  updateHeader() {
    const header = new HeaderView(this.model.gameState);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.onBackButtonClick = () => this.goBackScreen();
  }

  changeLevelView(view) {
    this.root.replaceChild(view.element, this.level.element);
    this.level = view;
    resizeImagesFromElement(view.element);
    this.level.onFormClick = this.onAnswerGiven.bind(this);
  }

  onAnswerGiven(isCorrect) {
    this.stopGame();
    this.answer = this.model._gameState.answers[this.model._gameState.questionNumber];
    if (isCorrect) {
      this.answer = this.getAnswerType(this.model.gameState.time);
    } else {
      this.answer = AnswerType.WRONG;
      this.model.takeOffLife();
    }
    this.model.recordAnswer(this.answer);
    this.checkContinue();
  }

  checkContinue() {
    if (this.model.isDead() || !this.model.hasNextLevel()) {
      if (!this.model.isDead()) {
        this.model.win();
      }
      App.showStats(this.model.gameState);
    } else {
      this.startGame();
    }
  }

  changeLevel() {
    this.model.restartTime();
    this.updateHeader();
    const newGameType = this.data[this.model.gameState.questionNumber].type;

    let level;
    switch (newGameType) {
      case GameType.TINDER_LIKE:
        level = new GameOneView(this.model);
        break;
      case GameType.TWO_OF_TWO:
        level = new GameTwoView(this.model);
        break;
      case GameType.ONE_OF_THREE:
        level = new GameThreeView(this.model);
        break;
    }
    this.changeLevelView(level);
  }

  goBackScreen() {
    App.showGreeting();
  }

  getAnswerType(time) {
    this.answerTime = TimeLimits.INITIAL - time;
    let answerType;
    if (this.answerTime < TimeLimits.FAST) {
      answerType = AnswerType.FAST;
    } else if (this.answerTime <= TimeLimits.SLOW) {
      answerType = AnswerType.NORMAL;
    } else {
      answerType = AnswerType.SLOW;
    }
    return answerType;
  }
}
