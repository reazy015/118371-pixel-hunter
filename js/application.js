import IntroScreen from "./screens/intro-screen";
import GreetingScreen from "./screens/greeting-screen";
import RulesScreen from "./screens/rules-screen";
import GameScreen from "./screens/game-screen";
import StatsScreen from "./screens/stats-screen";
import GameModel from "./game-model";
import Loader from "./utils/loader";
import ErrorView from "./view/error-view";

const screenContainer = document.querySelector(`.central`);

const showScreen = (element) => {
  screenContainer.innerHTML = ``;
  screenContainer.appendChild(element);
};

const showScreenWithAnimation = (element) => {
  screenContainer.firstElementChild.classList.add(`hide-animation`);
  element.classList.add(`show-animation`);
  screenContainer.appendChild(element);
};

let gameData;

export default class Application {
  static async start() {
    try {
      gameData = await Loader.loadData();
      await Loader.preloadImages(gameData);
      this.showGreeting(true);
    } catch (error) {
      Application.showError(error);
    }
  }

  static showIntro() {
    const intro = new IntroScreen();
    showScreen(intro.root);
    this.start();
  }

  static showGreeting(withAnimation) {
    const greeting = new GreetingScreen();
    if (withAnimation) {
      showScreenWithAnimation(greeting.root);
    } else {
      showScreen(greeting.root);
    }
    greeting.init();
  }

  static showRules() {
    const rules = new RulesScreen();
    showScreen(rules.root);
    rules.init();
  }

  static showGame(playerName) {
    const game = new GameScreen(new GameModel(gameData, playerName));
    showScreen(game.root);
    game.startGame();
  }

  static async showStats(model) {
    const playerName = model.playerName;

    try {
      await Loader.saveResults(model.gameState, playerName);
      const stats = new StatsScreen(await Loader.loadResults(playerName));
      showScreen(stats.root);
      stats.init();
    } catch (error) {
      Application.showError(error);
    }
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    showScreen(errorView.element);
  }
}
