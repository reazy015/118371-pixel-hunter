import IntroScreen from "./screens/intro-screen";
import GreetingScreen from "./screens/greeting-screen";
import RulesScreen from "./screens/rules-screen";
import GameScreen from "./screens/game-screen";
import StatsScreen from "./screens/stats-screen";
import GameModel from "./game-model";

const showScreen = (element) => {
  const screenContainer = document.querySelector(`.central`);
  screenContainer.innerHTML = ``;
  screenContainer.appendChild(element);
};


export default class Application {
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

  static showGame() {
    const game = new GameScreen(new GameModel());
    showScreen(game.root);
    game.startGame();
  }

  static showStats(gameState) {
    const stats = new StatsScreen(gameState);
    showScreen(stats.root);
    stats.init();
  }
}
