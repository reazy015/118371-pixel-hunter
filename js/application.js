import IntroScreen from "./screens/intro-screen";
import GreetingScreen from "./screens/greeting-screen";
import RulesScreen from "./screens/rules-screen";
import GameScreen from "./screens/game-screen";
import StatsScreen from "./screens/stats-screen";
import GameModel from "./game-model";
import Loader from "./utils/loader";
import ErrorView from "./view/error-view";

const showScreen = (element) => {
  const screenContainer = document.querySelector(`.central`);
  screenContainer.innerHTML = ``;
  screenContainer.appendChild(element);
};

export default class Application {
  static start(playerName) {
    Loader.loadData()
        .then((data) => {
          Application.showGame(data, playerName);
        })
        .catch(Application.showError);
  }

  static showIntro() {
    const intro = new IntroScreen();
    showScreen(intro.root);
    intro.init();
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    showScreen(greeting.root);
    greeting.init();
  }

  static showRules() {
    const rules = new RulesScreen();
    showScreen(rules.root);
    rules.init();
  }

  static showGame(data, playerName) {
    const game = new GameScreen(new GameModel(data, playerName));
    showScreen(game.root);
    game.startGame();
  }

  static showStats(model) {
    const playerName = model.playerName;
    Loader.saveResults(model.gameState, playerName)
        .then(() => Loader.loadResults(playerName))
        .then((data) => {
          const stats = new StatsScreen(data);
          showScreen(stats.root);
          stats.init();
        })
        .catch(Application.showError);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    showScreen(errorView.element);
  }
}
